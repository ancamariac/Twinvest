import pandas as pd
from datetime import datetime
from openpyxl import load_workbook

# citim datele din fisierul xlsx
data = pd.read_excel("output_labeled.xlsx")

# setam cuvintele cheie
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
   results[keyword]["score"] = (-1) * results[keyword]["negative"] + 0.1 * results[keyword]["neutral"] + results[keyword]["positive"]

# adaugam cuvintele cheie lipsa in dictionar cu valorile implicite
for keyword in keywords:
   results.setdefault(keyword, {"positive": 0, "negative": 0, "neutral": 0, "score": 0})

# creem dataframe-ul pentru a salva rezultatele
df = pd.DataFrame.from_dict(results, orient="index")

# adaugam o coloana cu data si ora la care a fost rulat scriptul
now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
df["last_update"] = now

# trendul in functie de scor 
# adaugam o coloana pentru trend
def get_trend(score):
   trend_threshold = 1
   
   if score >= (-1) * trend_threshold and score <= trend_threshold:
      return "stable"
   elif score > trend_threshold:
      return "rising"
   else:
      return "falling"

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
