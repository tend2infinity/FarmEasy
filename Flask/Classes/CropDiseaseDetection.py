import tensorflow as tf
import cv2
from tensorflow.keras.preprocessing.image import img_to_array
import matplotlib.pyplot as plt
import numpy as np
from PIL import Image
import requests
import os

from tensorflow.keras.applications import DenseNet201
# model = tf.lite.TFLiteConverter.from_keras_model('../../Models/transfer_model')
# tf.keras.backend.set_learning_phase(0)  # Ignore dropout at inference

model = tf.keras.models.load_model("/home/zeph/Desktop/FarmEasy/transfer_model.h5")

DEFAULT_IMAGE_SIZE = 224
def convert_image_to_array(image_dir):
    try:
        image = Image.open(requests.get(image_dir, stream=True).raw)
        if image is not None:
            image = cv2.resize(image, DEFAULT_IMAGE_SIZE)   
            return img_to_array(image)
        else:
            return np.array([])
    except Exception as e:
        print(f"Error : {e}")
        return None


def predict_disease(image_path):
    image_array = convert_image_to_array(image_path)
    np_image = np.array(image_array, dtype=np.float16) / 225.0
    np_image = np.expand_dims(np_image,0)
    plt.imshow(plt.imread(image_path))
    result = model.predict(np_image)
    print(result)
    return {'success':'Okay'}