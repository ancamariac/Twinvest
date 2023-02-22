import pickle
from keras.models import Sequential
from keras.layers import Dense, Dropout
from sklearn.model_selection import train_test_split
import numpy as np
import itertools 
from tensorflow import keras
import matplotlib.pyplot as plt

# load dataset
# X = features
# Y = labels
with open('D:\\Workspace\\tweets-sentiment-analysis\\embeddings.pk', 'rb') as f:
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

# grid search dict
dct_grid_space = {
    'layer1' : [
        256,
        128,
        512
    ],
    'layer2' : [
        256,
        128,
        512
    ],
    'layer3' : [
        256,
        128,
        512
    ],
    'dropout1' : [
        0.1,
        0.2,
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

def create_model(l1, l2, l3, d, opt_name, lr):
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
    
    return model

best_accuracy = 0
best_combination = grid_combs[0]

# pentru fiecare combinare cream cate un model ca sa vedem
# care are scorul cel mai bun
for combination in grid_combs:
    model = create_model(combination[0], combination[1], combination[2],
                         combination[3], combination[4], combination[5])
    
    history = model.fit(X_train, Y_train, batch_size=512, epochs=100, validation_data=(X_val, Y_val), verbose=0)
    # compara rezultatele cu cele reale -> face metricile modelului(loss, acc)
    scores = model.evaluate(X_test, Y_test)
    # print(f'Score: {model.metrics_names[0]} of {scores[0]}; {model.metrics_names[1]} of {scores[1]*100}%')
    
    if scores[1] > best_accuracy:
        best_accuracy = scores[1]
        best_combination = combination
  
print(best_combination)

# se creeaza modelul cu cea mai buna combinatie obtinuta din grid search
model = create_model(best_combination[0], best_combination[1], best_combination[2],
                     best_combination[3], best_combination[4], best_combination[5])

history = model.fit(X_train, Y_train, batch_size=512, epochs=100, validation_data=(X_val, Y_val))
# compara rezultatele cu cele reale -> face metricile modelului(loss, acc)
scores = model.evaluate(X_test, Y_test)
print(f'Score: {model.metrics_names[0]} of {scores[0]}; {model.metrics_names[1]} of {scores[1]*100}%')

# save the model
model.save('D:\\Workspace\\tweets-sentiment-analysis\\model.h5')

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