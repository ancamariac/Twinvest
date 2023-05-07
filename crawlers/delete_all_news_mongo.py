import pandas as pd
import pymongo
import os
from dotenv import load_dotenv
from pymongo import MongoClient

# load the environment variables
load_dotenv()

# set up the MongoDB connection
client = pymongo.MongoClient(os.getenv("MONGO_URI"))
db = client.test
collection = db.predictions

# Construirea filtrului pentru a șterge toate intrările din colecție
filter_query = {}

# Ștergerea intrărilor conform filtrului
result = collection.delete_many(filter_query)

print(f'{result.deleted_count} intrări au fost șterse.')