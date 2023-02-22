import numpy as np
import tensorflow as tf
from transformers import BertTokenizer, TFBertModel
from tensorflow import keras

NN_model = keras.models.load_model('D:\\Workspace\\tweets-sentiment-analysis\\model.h5')


tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = TFBertModel.from_pretrained('bert-base-uncased')

print("Your input:")
text = input()
input_ids = tf.constant(tokenizer.encode(text, max_length=512, truncation=True))[None, :]
outputs = model(input_ids)
#np_arr = np.array(outputs)
final = np.array(outputs["pooler_output"]).reshape(768)
X_final = np.array([final])
val_pred = NN_model.predict(X_final)
print(val_pred)