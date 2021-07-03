
# import tensorflow as tf
# from tensorflow import keras

# import matplotlib.pyplot as plt
# import numpy as np

# import os


# image_size = 224
# target_size = (image_size, image_size)
# input_shape = (image_size, image_size, 3)

# batch_size = 64
# epochs = 100




# base_dir = "../../Datasets/new plant diseases dataset(augmented)/New Plant Diseases Dataset(Augmented)"
# train_dir = os.path.join(base_dir,"train")
# test_dir = os.path.join(base_dir,"valid")



# train_datagen = keras.preprocessing.image.ImageDataGenerator(rescale = 1/255.0,
#                                                              shear_range = 0.2,
#                                                              zoom_range = 0.2,
#                                                              width_shift_range = 0.2,
#                                                              height_shift_range = 0.2,
#                                                              fill_mode="nearest")

# test_datagen = keras.preprocessing.image.ImageDataGenerator(rescale = 1/255.0)



# train_data = train_datagen.flow_from_directory(train_dir,
#                                                target_size = (image_size, image_size),
#                                                batch_size = batch_size,
#                                                class_mode = "categorical")

# test_data = test_datagen.flow_from_directory(test_dir,
#                                              target_size = (image_size, image_size),
#                                              batch_size = batch_size,
#                                              class_mode = "categorical")


# categories = list(train_data.class_indices.keys())
# print(train_data.class_indices)





# base_model = tf.keras.applications.DenseNet201(weights = "imagenet",
#                                              include_top = False,
#                                              input_shape = input_shape)

# base_model.trainable = False


# inputs = keras.Input(shape = input_shape)

# x = base_model(inputs, training = False)
# x = tf.keras.layers.GlobalAveragePooling2D()(x)
# x = tf.keras.layers.Dense(38, 
#                           activation="softmax")(x)

# model = keras.Model(inputs = inputs, 
#                     outputs = x, 
#                     name="LeafDisease_MobileNet")



# optimizer = tf.keras.optimizers.Adam() #lr=0.05 --- Mention LR here, default - 0.01

# model.compile(optimizer = optimizer,
#               loss = tf.keras.losses.CategoricalCrossentropy(from_logits = True),
#               metrics=[keras.metrics.CategoricalAccuracy(), 
#                        'accuracy'])

# history = model.fit(train_data,
#                     validation_data=test_data,
#                     epochs=1,
#                     steps_per_epoch=10,
#                     validation_steps=5)

# model.save('./../Flask/Classes/new_model.h5')



#!/usr/bin/env python
# coding: utf-8

# # Import Libraries
# 

# Importing necessary libraries and modules required to build the classification model.

# In[1]:


import numpy as np
import pickle
import cv2
import os
import matplotlib.pyplot as plt
from os import listdir
from sklearn.preprocessing import LabelBinarizer
from keras.models import Sequential
from keras.layers.normalization import BatchNormalization
from keras.layers.convolutional import Conv2D
from keras.layers.convolutional import MaxPooling2D
from keras.layers.core import Activation, Flatten, Dropout, Dense
from keras import backend as K
from keras.preprocessing.image import ImageDataGenerator
from keras.optimizers import Adam
from keras.preprocessing import image
from keras.preprocessing.image import img_to_array
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.model_selection import train_test_split


# In[3]:


# import tensorflow as tf


# In[10]:


# gpus = tf.config.experimental.list_physical_devices('GPU')
# for gpu in gpus:
#   tf.config.experimental.set_memory_growth(gpu, True)


# # # Load Dataset

# Initializing a few parameters required for the image dataset preprocessing.

# In[11]:


# Dimension of resized image
DEFAULT_IMAGE_SIZE = tuple((256, 256))

# Number of images used to train the model
N_IMAGES = 100

# Path to the dataset folder
root_dir = '../../Datasets/New Plant Diseases Dataset(Augmented)/New Plant Diseases Dataset(Augmented)/'

train_dir = os.path.join(root_dir, 'train')
val_dir = os.path.join(root_dir, 'val')


# We use the function `convert_image_to_array` to resize an image to the size `DEFAULT_IMAGE_SIZE` we defined above.

# In[12]:


# def convert_image_to_array(image_dir):
#     try:
#         image = cv2.imread(image_dir)
#         if image is not None:
#             image = cv2.resize(image, DEFAULT_IMAGE_SIZE)   
#             return img_to_array(image)
#         else:
#             return np.array([])
#     except Exception as e:
#         print(f"Error : {e}")
#         return None


# Here, we load the training data images by traversing through all the folders and converting all the images and labels into separate lists respectively.
# 
# *NOTE: We use a small portion of the entire dataset due to the computing limitations. Tweak `N_IMAGES` to include entire dataset.*

# In[ ]:


image_list, label_list = [], []

try:
    print("[INFO] Loading images ...")
    plant_disease_folder_list = listdir(train_dir)

    for plant_disease_folder in plant_disease_folder_list:
        print(f"[INFO] Processing {plant_disease_folder} ...")
        plant_disease_image_list = listdir(f"{train_dir}/{plant_disease_folder}/")

        for image in plant_disease_image_list[:N_IMAGES]:
            image_directory = f"{train_dir}/{plant_disease_folder}/{image}"
            if image_directory.endswith(".jpg")==True or image_directory.endswith(".JPG")==True:
                image_list.append(convert_image_to_array(image_directory))
                label_list.append(plant_disease_folder)

    print("[INFO] Image loading completed")  
except Exception as e:
    print(f"Error : {e}")

# Transform the loaded training image data into numpy array
np_image_list = np.array(image_list, dtype=np.float16) / 225.0
print()

# Check the number of images loaded for training
image_len = len(image_list)
print(f"Total number of images: {image_len}")


# Examine the labels/classes in the training dataset.

# In[ ]:


label_binarizer = LabelBinarizer()
image_labels = label_binarizer.fit_transform(label_list)

pickle.dump(label_binarizer,open('../Models/plant_disease_label_transform.pkl', 'wb'))
n_classes = len(label_binarizer.classes_)

print("Total number of classes: ", n_classes)


# # Augment and Split Dataset

# Using `ImageDataGenerator` to augment data by performing various operations on the training images.

# In[8]:


augment = ImageDataGenerator(rotation_range=25, width_shift_range=0.1,
                             height_shift_range=0.1, shear_range=0.2, 
                             zoom_range=0.2, horizontal_flip=True, 
                             fill_mode="nearest")


# Splitting the data into training and test sets for validation purpose.

# In[9]:


print("[INFO] Splitting data to train and test...")
x_train, x_test, y_train, y_test = train_test_split(np_image_list, image_labels, test_size=0.2, random_state = 42) 


# # Build Model
# 

# Defining the hyperparameters of the plant disease classification model.

# In[10]:


EPOCHS = 30
STEPS = 100
LR = 1e-3
BATCH_SIZE = 32
WIDTH = 256
HEIGHT = 256
DEPTH = 3


# Creating a sequential model and adding Convolutional, Normalization, Pooling, Dropout and Activation layers at the appropriate positions.

# In[11]:


model = Sequential()
inputShape = (HEIGHT, WIDTH, DEPTH)
chanDim = -1

if K.image_data_format() == "channels_first":
    inputShape = (DEPTH, HEIGHT, WIDTH)
    chanDim = 1

model.add(Conv2D(32, (3, 3), padding="same",input_shape=inputShape))
model.add(Activation("relu"))
model.add(BatchNormalization(axis=chanDim))
model.add(MaxPooling2D(pool_size=(3, 3)))
model.add(Dropout(0.25))
model.add(Conv2D(64, (3, 3), padding="same"))
model.add(Activation("relu"))
# model.add(BatchNormalization(axis=chanDim))
# model.add(Conv2D(64, (3, 3), padding="same"))
# model.add(Activation("relu"))
model.add(BatchNormalization(axis=chanDim))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.25))
# model.add(Conv2D(128, (3, 3), padding="same"))
# model.add(Activation("relu"))
# model.add(BatchNormalization(axis=chanDim))
model.add(Conv2D(128, (3, 3), padding="same"))
model.add(Activation("relu"))
model.add(BatchNormalization(axis=chanDim))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.25))
model.add(Flatten())
model.add(Dense(512))
model.add(Activation("relu"))
model.add(BatchNormalization())
# model.add(Dropout(0.5))
model.add(Dense(n_classes))
model.add(Activation("softmax"))

model.summary()


# # Train Model
# 

# We initialize Adam optimizer with learning rate and decay parameters. 
# 
# Also, we choose the type of loss and metrics for the model and compile it for training.

# In[ ]:


# Initialize optimizer
opt = Adam(lr=LR, decay=LR / EPOCHS)

# Compile model
model.compile(loss="binary_crossentropy", optimizer=opt, metrics=["accuracy"])

# Train model
print("[INFO] Training network...")
history = model.fit_generator(augment.flow(x_train, y_train, batch_size=BATCH_SIZE),
                              validation_data=(x_test, y_test),
                              steps_per_epoch=len(x_train) // BATCH_SIZE,
                              epochs=EPOCHS, 
                              verbose=1)


# # Evaluate Model

# Comparing the accuracy and loss by plotting the graph for training and validation.

# In[ ]:





# Evaluating model accuracy by using the `evaluate` method

# In[11]:


print("[INFO] Calculating model accuracy")
scores = model.evaluate(x_test, y_test)
print(f"Test Accuracy: {scores[1]*100}")


# # Save Model

# In[15]:


# # Dump pickle file of the model
# print("[INFO] Saving model...")
# pickle.dump(model,open('plant_disease_classification_model.h5', 'wb'))
model.save('../Models/plant_disease_classification')


# In[ ]:





# In[12]:


# def predict_disease(image_path):
#     image_array = convert_image_to_array(image_path)
#     np_image = np.array(image_array, dtype=np.float16) / 225.0
#     np_image = np.expand_dims(np_image,0)
#     plt.imshow(plt.imread(image_path))
#     result = model.predict_classes(np_image)
#     print((image_labels.classes_[result][0]))


# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:



