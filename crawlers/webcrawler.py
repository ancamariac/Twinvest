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
   
if __name__ == '__main__':
   path = os.getcwd()
   keywords = [
      'Bitcoin',
      'Ethereum',
      'Dodgecoin',
      'Tether',
      'BNB',
      'Cardano',
      'Polygon',
      'Solana',
      'Polkadot',
      'Apple',
      'Tesla',
      'Microsoft',
      'Amazon',
      'NVIDIA',
      'Meta',
      'Disney',
      'Shopify',
      'Netflix',
      'Meta',
      'Roblox',
      'Coinbase',
      'Intel',
      'AMD'
   ]
   crawl(None, keywords)
   apply_ML()