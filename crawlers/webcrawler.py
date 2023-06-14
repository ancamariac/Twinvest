from bs4 import BeautifulSoup
from urllib.request import urlopen
import re
import time
import pickle
import os
import pandas as pd
from datetime import datetime, timedelta
from urllib.parse import quote

def search(page_limit=None):
   business_topic_id = "/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx6TVdZU0FtVnVHZ0pWVXlnQVAB"
   markets_subtopic_id = "/sections/CAQiXENCQVNQd29JTDIwdk1EbHpNV1lTQW1WdUdnSlZVeUlQQ0FRYUN3b0pMMjB2TURsNU5IQnRLaG9LR0FvVVRVRlNTMFZVVTE5VFJVTlVTVTlPWDA1QlRVVWdBU2dBKioIAComCAoiIENCQVNFZ29JTDIwdk1EbHpNV1lTQW1WdUdnSlZVeWdBUAFQAQ"

   # asta e pentru custom input
   # news_url = f'https://news.google.com/rss/search?q=<{search_string}>'

   # asta e pentru stiri legate de market
   news_url = 'https://news.google.com/rss' + business_topic_id + markets_subtopic_id

   client = urlopen(news_url)
   xml_page = client.read()
   client.close()
   soup_page = BeautifulSoup(xml_page, 'xml')
   news_list = soup_page.find_all('item')
   return {'news_list': news_list[:page_limit]}

def search(search_string, page_limit=None):
   news_url = f'https://news.google.com/rss/search?q={search_string}'
   client = urlopen(news_url)
   xml_page = client.read()
   client.close()
   soup_page = BeautifulSoup(xml_page, 'xml')
   news_list = soup_page.find_all('item')

   # Filtrăm știrile din ultima zi
   filtered_news = []
   current_date = datetime.now()
   one_day_ago = current_date - timedelta(days=1)
   for news in news_list:
      pub_date = datetime.strptime(news.pubDate.text, '%a, %d %b %Y %H:%M:%S %Z')
      if pub_date >= one_day_ago:
         filtered_news.append(news)

   return {'news_list': filtered_news[:page_limit], 'keyword': search_string}

def archive(news_list, df, keyword):
   try:
      file = open('archive_dict.pkl', 'rb')
      archive_dict = pickle.load(file)
      file.close()
   except:
      archive_dict = dict()

   success = 0
   failed = 0
   for news in news_list:
      title = re.sub('[\/:*?"<>|]', '#', news.title.text)
      struc_time = time.strptime(news.pubDate.text[5:-4], '%d %b %Y %H:%M:%S')
      timestamp = time.strftime('%Y%m%d%H%M%S', struc_time)
      filename = timestamp + ' ' + title + '.html'
      url = news.link.text
      if filename not in archive_dict:
         try:
               archive_dict.update({filename: [url, 1, news.source.text]})
               success += 1
               print(news.title.text)
               print(news.link.text)
               print(news.pubDate.text)
               print(news.source.text)
               df2 = {'Title': news.title.text, 'Link': news.link.text, 'Date': news.pubDate.text, 'Source': news.source.text, 'Keyword': keyword}
               df = df.append(df2, ignore_index=True)
         except Exception as e:
               print('Failed to Download: ' + url)
               print(e)
               failed += 1
         print('-' * 60)
   print("Updating dictionary")
   with open('archive_dict.pkl', 'wb') as file:
      pickle.dump(archive_dict, file)

   return success, failed, df


def crawl(page_limit=None, keywords=None):
   df = pd.DataFrame(columns=['Title', 'Link', 'Date', 'Source', 'Keyword', 'Label'])
   df.to_excel('output.xlsx', index=False)
   print('Crawling news...')
   print('-' * 60)
   if keywords is None:
      result = search(page_limit)
      news_list = result['news_list']
      keyword = None
   else:
      news_list = []
      for kw in keywords:
         encoded_kw = quote(kw)
         result = search(encoded_kw, page_limit)
         news_list.extend(result['news_list'])
         keyword = result['keyword']
         success, failed, df = archive(news_list, df, keyword)
   print('Downloaded : ' + str(success), end=' | ')
   print('Failed: ' + str(failed))
   print('-' * 60)
   df.to_excel("output.xlsx")

import pymongo
from dotenv import load_dotenv
from pymongo import MongoClient
from dateutil.parser import parse
from datetime import datetime

def delete_old_news_from_mongodb():
   # load the environment variables
   load_dotenv()

   # set up the MongoDB connection
   client = pymongo.MongoClient(os.getenv("MONGO_URI"))
   db = client.test
   collection = db.news

   # Setarea orei la miezul nopții pentru a sterge toate stirile mai putin cele din ziua
   # curenta
   current_date = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)

   # Construirea filtrului pentru a șterge intrările cu data mai mică decât data curentă
   filter_query = {'date': {'$lt': current_date}}

   # Ștergerea intrărilor conform filtrului
   result = collection.delete_many(filter_query)

   print(f'{result.deleted_count} intrări au fost șterse.')

import numpy as np
import pandas as pd
import tensorflow as tf
from transformers import BertTokenizer, TFBertModel
from tensorflow import keras

def apply_ML():
   NN_model = keras.models.load_model('../ML_model/model.h5')

   tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
   model = TFBertModel.from_pretrained('bert-base-uncased')

   df = pd.read_excel('output.xlsx', dtype={'Label': str})

   # efectuare predictii
   for index, row in df.iterrows():
      title = row['Title']
      input_ids = tf.constant(tokenizer.encode(title, max_length=512, truncation=True))[None, :]
      outputs = model(input_ids)
      final = np.array(outputs["pooler_output"]).reshape(768)
      X_final = np.array([final])
      val_pred = NN_model.predict(X_final)
      
      # se ia labelul cu valoarea cea mai mare
      label = np.argmax(val_pred)
      
      # se adauga labelul in xlsx
      if label == 0:
         df.at[index, 'Label'] = 'negative'
      elif label == 1:
         df.at[index, 'Label'] = 'neutral'
      else:
         df.at[index, 'Label'] = 'positive'
      
   # se salveaza dataframeul
   df.to_excel('output_labeled.xlsx', index=False)
   
def add_news_in_mongodb():
   # load the environment variables
   load_dotenv()

   # set up the MongoDB connection
   client = pymongo.MongoClient(os.getenv("MONGO_URI"))
   db = client.test
   collection = db.news

   # Citirea datelor din fișierul Excel
   df = pd.read_excel('output_labeled.xlsx')

   # Iterarea prin rândurile DataFrame-ului și adăugarea în bază de date
   documents = []
   for index, row in df.iterrows():
      title = row['Title']
      link = row['Link']
      date_str = row['Date']
      source = row['Source']
      keyword = row['Keyword']
      label = row['Label']
      
      # Convertirea șirului de dată în obiect datetime
      date = parse(date_str)
      
      document = {
         'title': title,
         'link': link,
         'date': date,
         'source': source,
         'keyword': keyword,
         'label': label
      }
      documents.append(document)

   # Inserarea documentelor în colecția MongoDB 
   collection.insert_many(documents)   

from openpyxl import load_workbook

# trendul in functie de scor 
# adaugam o coloana pentru trend
def get_trend(score):
   trend_threshold = 1
   
   if score >=  4 and score <= 6:
      return "stable"
   elif score > trend_threshold:
      return "rising"
   else:
      return "falling"

def score_labels(keywords=None):
   # citim datele din fisierul xlsx
   data = pd.read_excel("output_labeled.xlsx")

   # initializam un dictionar pentru a stoca valorile
   results = {}
   for keyword in keywords:
      results[keyword] = {"positive": 0, "negative": 0, "neutral": 0, "score": 0}

   # calculam numarul de stiri pentru fiecare keyword
   for index, row in data.iterrows():
      label = row['Label']
      for keyword in keywords:
         if keyword in row['Keyword']:
            results[keyword][label] += 1

   # calculam scorul pentru fiecare keyword
   for keyword in keywords:
      results[keyword]["score"] = (-1) * results[keyword]["negative"] + 0.1 * results[keyword]["neutral"] + results[keyword]["positive"]

   # adaugam cuvintele cheie lipsa in dictionar cu valorile implicite
   for keyword in keywords:
      results.setdefault(keyword, {"positive": 0, "negative": 0, "neutral": 0, "score": 0})

   # creem dataframe-ul pentru a salva rezultatele
   df = pd.DataFrame.from_dict(results, orient="index")

   # adaugam o coloana cu data si ora la care a fost rulat scriptul
   now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
   df["last_update"] = now

   df["trend"] = df["score"].apply(get_trend)
   
   # adaugam valorile in xlsx-ul rezultat sau cream unul nou
   try:
      book = load_workbook("results.xlsx")
      writer = pd.ExcelWriter("results.xlsx", engine="openpyxl")
      writer.book = book
      writer.sheets = dict((ws.title, ws) for ws in book.worksheets)
      df.to_excel(writer, sheet_name="Sheet1", index=True)
      writer.save()
      writer.close()
      print("Rezultatele au fost adaugate in fisierul existent.")
   except:
      df.to_excel("results.xlsx", sheet_name="Sheet1", index=True)
      print("A fost creat un fisier nou cu rezultatele.")

def update_predictions():
   # load the environment variables
   load_dotenv()

   # set up the MongoDB connection
   client = pymongo.MongoClient(os.getenv("MONGO_URI"))
   db = client.test
   predictions_collection = db.predictions

   # citim datele din fisierul xlsx
   data = pd.read_excel("results.xlsx")

   # initializam un dictionar pentru a stoca valorile
   results = {}
   for index, row in data.iterrows():
      keyword = row[0]
      results[keyword] = {"positive": 0, "negative": 0, "neutral": 0, "score": 0}

   # calculam numarul de stiri pentru fiecare keyword
   for index, row in data.iterrows():
      keyword = row[0]
      positive = row['positive']
      negative = row['negative']
      neutral = row['neutral'] 
      score = row['score']
      last_update = row['last_update']
      trend = row['trend']
      
      results[keyword]['positive'] = positive
      results[keyword]['negative'] = negative
      results[keyword]['neutral'] = neutral
      results[keyword]['score'] = score

   def get_trend(score):
      trend_threshold = 1

      if score >= 4 and score <= 6:
         return "stable"
      elif score > trend_threshold:
         return "rising"
      else:
         return "falling"

   # actualizam colectia cu valorile noi
   for keyword in results.keys():
      update_data = {
         "$set": {
               "positive": results[keyword]["positive"],
               "negative": results[keyword]["negative"],
               "neutral": results[keyword]["neutral"],
               "score": results[keyword]["score"],
               "last_update": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
               "trend": get_trend(results[keyword]["score"])
         }
      }
      predictions_collection.update_one({"keyword": keyword}, update_data, upsert=True)

   # afisam mesajul de finalizare a operatiei
   print("Datele au fost actualizate cu succes in baza de date.")

if __name__ == '__main__':
   path = os.getcwd()
   # stergerea stirilor vechi din baza de date mongo
   delete_old_news_from_mongodb()

   # definirea cuvintelor cheie dupa care se vor cauta stiri
   keywords = ['Bitcoin','Ethereum','Dodgecoin','Tether','BNB','Cardano','Polygon','Solana','Polkadot','Apple','Tesla','Microsoft','Amazon','NVIDIA','Meta','Disney','Shopify','Netflix','Roblox','Coinbase','Intel','AMD']
   
   # obtinerea stirilor care contin cuvintele cheie definite, din ultimele doua zile
   # rezultatul se salveaza in fisierul output.xlsx
   crawl(None, keywords)
   
   # generarea label-urilor (positive/negative/neutral) pentru fiecare stire 
   # din fisierul generat anterior output.xlsx
   # rezultatul va fi salvat in fisierul output_labeled.xlsx 
   apply_ML()
   
   # adaugarea stirilor din fisierul output_labeled.xlsx in baza de date
   # pentru a fi prezentate user-ului in sectiune Google News
   add_news_in_mongodb()
   
   # calcularea scorului pentru fiecare keyword in parte, in functie de numarul de stiri
   # positive/negative/neutral, pentru a fi folosit mai departe in predictii
   # se vor folosi datele din output_labeled.xlsx
   # rezultatul va fi salvat in fisierul results.xlsx
   score_labels(keywords)
   
   # se face update in baza de date pentru colectia predictions in functie de scorurile
   # calculate anterior si salvate in fisierul results.xlsx
   update_predictions()