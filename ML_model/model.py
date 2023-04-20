import pickle
from keras.models import Sequential
from keras.layers import Dense, Dropout
from sklearn.model_selection import train_test_split
import numpy as np
import itertools 
from tensorflow import keras
import matplotlib.pyplot as plt
import tensorflow as tf
import os 

# load dataset
# X = features
# Y = labels

path = os.path.join(os.getcwd(), 'ML_model')
model_path = os.path.join(path, 'model.h5')
emb_path = os.path.join(path, 'embeddings.pk')

with open(emb_path, 'rb') as f:
   X, Y = pickle.load(f)

Y_aux = []

# transformam fiecare element din Y in one hot encoding
for elem in Y:
   aux = [0, 0, 0]
   aux[elem] = 1
   Y_aux.append(aux)
   
X = np.array(X)
Y = np.array(Y_aux)

# split into train, val, test
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=42)

X_train, X_val, Y_train, Y_val = train_test_split(X_train, Y_train, test_size=0.125, random_state=42) # 0.125 x 0.8 = 0.1

checkpoint_filepath = os.path.join(os.getcwd(), 'tmp', 'checkpoint')

# grid search dict
dct_grid_space = {
   'layer1' : [
      1024,
      512
   ],
   'layer2' : [
      1024,
      512
   ],
   'layer3' : [
      1024,
      512
   ],
   'dropout1' : [
      0.1,
      0.3
   ],
   'dropout2' : [
      0.1,
      0.3
   ],
   'opt_class' : [
      'sgd',
      'adam'
   ],
   'lr' : [
      0.001,
      0.01,
   ]
}

# generate all combinations for grid search
grid_params = []
grid_values = []

for k in dct_grid_space:
   grid_params.append(k)
   grid_values.append(dct_grid_space[k])
# se face produsul cu toate elementele din grid_values
grid_combs = list(itertools.product(*grid_values))

def create_model(l1, l2, l3, d1, d2, opt):
   model = Sequential()
   model.add(l1)
   model.add(d1)
   model.add(l2)
   model.add(d2)
   model.add(l3)
   model.add(Dense(3, activation='softmax'))
   model.compile(loss='categorical_crossentropy', metrics=['accuracy'], optimizer=opt, run_eagerly=True)
   return model

'''def create_model(l1, l2, l3, d, opt_name, lr):
   # initialize the model
   model = Sequential()

   # add the layers
   model.add(Dense(l1, input_shape=(768, ), activation='relu')) 
   model.add(Dropout(d)) 
   model.add(Dense(l2, activation='relu'))
   model.add(Dropout(d))
   model.add(Dense(l3, activation='relu'))
   model.add(Dense(3, activation='softmax'))

   if opt_name == 'adam':
      opt = keras.optimizers.Adam(learning_rate=lr)
   else:
      opt = keras.optimizers.SGD(learning_rate=lr)

   # compile, train and evaluate
   model.compile(loss='categorical_crossentropy', metrics=['accuracy'], optimizer=opt)
   
   return model'''

best_acc = 0
best_comb = grid_combs[0]

# pentru fiecare combinare cream cate un model ca sa vedem
# care are scorul cel mai bun

counter = 0

for combination in grid_combs:
   ### Modifica aici parametrii
   print("Combination ", counter)
   print(combination)
   counter += 1

   # callbacks to save the best epoch
   model_checkpoint_callback = tf.keras.callbacks.ModelCheckpoint(
      filepath=checkpoint_filepath,
      save_weights_only=True,
      monitor='val_accuracy',
      mode='max',
      save_best_only=True)

   # combination = [l1_num, l2_num, d1, act1, act2,  opt, lr]
   l1 = Dense(combination[0], input_shape=(768, ), activation='relu')
   l2 = Dense(combination[1], activation='relu')
   l3 = Dense(combination[2], activation='relu')
   d1 = Dropout(combination[3])
   d2 = Dropout(combination[4])
   if combination[5] == 'adam':
      opt = keras.optimizers.Adam(learning_rate=combination[6])
   else:
      opt = keras.optimizers.SGD(learning_rate=combination[6])

   model = create_model(l1, l2, l3, d1, d2, opt)
   model.fit(X_train, Y_train, batch_size=128, epochs=50, validation_data=(X_val, Y_val), callbacks=[model_checkpoint_callback])
   model.load_weights(checkpoint_filepath)
   scores = model.evaluate(X_val, Y_val)

   acc = scores[1]
   print(f'{model.metrics_names[1]} of {acc*100}%;')
   
   if acc > best_acc:
      best_comb = combination
      best_acc = acc

   model.save(os.path.join(path, 'model.h5'))


print(best_comb)

# se creeaza modelul cu cea mai buna combinatie obtinuta din grid search
model_checkpoint_callback = tf.keras.callbacks.ModelCheckpoint(
   filepath=checkpoint_filepath,
   save_weights_only=True,
   monitor='val_accuracy',
   mode='max',
   save_best_only=True)

l1 = Dense(best_comb[0], input_shape=(768, ), activation="relu")
l2 = Dense(best_comb[1], activation="relu")
l3 = Dense(best_comb[2], activation="relu")
d1 = Dropout(best_comb[3])
d2 = Dropout(best_comb[4])
if best_comb[5] == 'adam':
   opt = keras.optimizers.Adam(learning_rate=best_comb[6])
else:
   opt = keras.optimizers.SGD(learning_rate=best_comb[6])

model = create_model(l1, l2, l3, d1, d2, opt)

history = model.fit(X_train, Y_train, batch_size=128, epochs=50, validation_data=(X_val, Y_val), callbacks=[model_checkpoint_callback])

# compara rezultatele cu cele reale -> face metricile modelului(loss, acc)
scores = model.evaluate(X_test, Y_test)
print(f'Score: {model.metrics_names[0]} of {scores[0]}; {model.metrics_names[1]} of {scores[1]*100}%')

# save the model
model.save(model_path)

# validation loss
plt.clf()
history_dict = history.history
loss_values = history_dict['loss']
val_loss_values = history_dict['val_loss']
epochs = range(1, (len(history_dict['loss']) + 1))
plt.plot(epochs, loss_values, 'bo', label='Training loss')
plt.plot(epochs, val_loss_values, 'b', label='Validation loss')
plt.title('Training and validation loss')
plt.xlabel('Epochs')
plt.ylabel('Loss')
plt.legend()
plt.show()

# validation accuracy
plt.clf()
acc_values = history_dict['accuracy']
val_acc_values = history_dict['val_accuracy']
epochs = range(1, (len(history_dict['accuracy']) + 1))
plt.plot(epochs, acc_values, 'bo', label='Training acc')
plt.plot(epochs, val_acc_values, 'b', label='Validation acc')
plt.title('Training and validation accuracy')
plt.xlabel('Epochs')
plt.ylabel('Accuracy')
plt.legend()
plt.show()