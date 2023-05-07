import numpy as np
import pandas as pd
import tensorflow as tf
from transformers import BertTokenizer, TFBertModel
from tensorflow import keras

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