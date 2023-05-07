import pandas as pd
import pymongo
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from dateutil.parser import parse
from datetime import datetime

# Acest script sterge stirile din baza de date Mongo

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