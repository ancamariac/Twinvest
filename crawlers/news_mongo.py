import pandas as pd
import pymongo
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from dateutil.parser import parse

# Acest script adauga datele din xlsx in baza de date Mongo

# load the environment variables
load_dotenv()

# set up the MongoDB connection
client = pymongo.MongoClient(os.getenv("MONGO_URI"))
db = client.test
collection = db.news

# Citirea datelor din fișierul Excel
df = pd.read_excel('output.xlsx')

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

print("Datele au fost adăugate cu succes în baza de date MongoDB.")
