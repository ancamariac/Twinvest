import pickle
from keras.models import Sequential
from keras.layers import Dense, Dropout
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt

# load dataset
with open('C:\\Users\\Bogdan\\Desktop\\FakeNews\\dataset.pickle', 'rb') as f:
    X, Y = pickle.load(f)

# split into train, val, test
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=42)
X_train, X_val, Y_train, Y_val = train_test_split(X_train, Y_train, test_size=0.125, random_state=42) # 0.125 x 0.8 = 0.1

# initialize the model
model = Sequential()

# add the layers
model.add(Dense(15, input_shape=(768, ), activation='relu')) 
model.add(Dropout(0.25)) 
model.add(Dense(5, activation='relu'))
model.add(Dropout(0.25))
model.add(Dense(1, activation='sigmoid'))

# compile, train and evaluate
model.compile(loss='binary_crossentropy', metrics=['accuracy'], optimizer='adam')
history = model.fit(X_train, Y_train, batch_size=512, epochs=20, validation_data=(X_val, Y_val))
scores = model.evaluate(X_test, Y_test)
print(f'Score: {model.metrics_names[0]} of {scores[0]}; {model.metrics_names[1]} of {scores[1]*100}%')

# save the model
model.save('C:\\Users\\Bogdan\\Desktop\\FakeNews\\model')


# plots
# https://www.kaggle.com/drscarlat/imdb-sentiment-analysis-keras-and-tensorflow/notebook

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