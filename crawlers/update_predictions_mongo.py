import pandas as pd
import pymongo
import os
from datetime import datetime
from openpyxl import load_workbook
from pymongo import MongoClient
from dotenv import load_dotenv

# load the environment variables
load_dotenv()

# set up the MongoDB connection
client = pymongo.MongoClient(os.getenv("MONGO_URI"))
db = client.test
predictions_collection = db.predictions

# citim datele din fisierul xlsx
data = pd.read_excel("output_labeled.xlsx")

keywords = ['Bitcoin', 'Ethereum', 'Dodgecoin', 'Tether', 'BNB', 'Cardano', 'Polygon', 'Solana', 'Polkadot', 'Apple', 'Tesla', 'Microsoft', 'Amazon', 'NVIDIA', 'Meta', 'Disney', 'Shopify', 'Netflix', 'Roblox', 'Coinbase', 'Intel', 'AMD']

# initializam un dictionar pentru a stoca valorile
results = {}
for keyword in keywords:
   results[keyword] = {"positive": 0, "negative": 0, "neutral": 0, "score": 0}

# calculam numarul de stiri pentru fiecare keyword
for index, row in data.iterrows():
   label = row["Label"]
   for keyword in keywords:
      if keyword in row["Keyword"]:
         results[keyword][label] += 1

# calculam scorul pentru fiecare keyword
for keyword in keywords:
   results[keyword]["score"] = round((-1) * results[keyword]["negative"] + 0.1 * results[keyword]["neutral"] + results[keyword]["positive"], 2)

# adaugam cuvintele cheie lipsa in dictionar cu valorile implicite
for keyword in keywords:
   results.setdefault(keyword, {"positive": 0, "negative": 0, "neutral": 0, "score": 0})

def get_trend(score):
   trend_threshold = 1
   
   if score >= (-1) * trend_threshold and score <= trend_threshold:
      return "stable"
   elif score > trend_threshold:
      return "rising"
   else:
      return "falling"

# actualizam colectia cu valorile noi
for keyword in keywords:
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