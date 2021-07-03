import tensorflow as tf
import numpy as np
from PIL import Image
import requests
from flask import jsonify
model = tf.keras.models.load_model('../Models/transfer_model.h5')
DEFAULT_IMAGE_SIZE = 224

def convert_image_to_array(image_dir):
    try:
        image = Image.open(requests.get(image_dir, stream=True).raw)
        image = image.resize((224,224))
        img_arr = np.array(image)
        return img_arr
    except Exception as e:
        print(f"Error : {e}")
        return None


def predict_disease(image_path):
    image_array = convert_image_to_array(image_path)
    np_image = np.array(image_array, dtype=np.float16) / 225.0
    np_image = np.expand_dims(np_image,0)
    result = model.predict(np_image)
    result  = result.flatten()
    converted_list = result.tolist()
    res = sorted(range(len(converted_list)), key = lambda sub: converted_list[sub])[-6:]
    return jsonify(result=res)