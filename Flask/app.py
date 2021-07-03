import os
import re
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
from flask import Flask,request
from flask_cors import CORS
from Classes.CropProduction import CropProduction
from Classes.CropDiseaseDetection import predict_disease
from Classes.CropRecommendation import CropRecommendation
CropProductionModel = CropProduction()
CropRecommendationModel  = CropRecommendation()

app = Flask(__name__)
CORS(app)
@app.route("/cropPrediction",methods = ['POST'])
def home():
    data = request.json
    return data


@app.route('/cropProduction',methods = ['POST'])
def prodiction():
    data = request.json
    print(data)
    return CropProductionModel.predictCropProductionInYear(data['state'],data['district'],int(data['year']))


@app.route('/cropProductionByYear',methods =['POST'])
def cropProdByYear():
    data = request.json
    return CropProductionModel.predictCropProductionByYears(data['state'],data['district'],data['crop'])


@app.route('/cropPredictByProduction',methods=['POST'])
def func():
    data = request.json
    return CropProductionModel.CropPredictionProduction(data['state'], data['season'], data['crop'],data['area'])


@app.route('/cropRecommendation',methods = ['POST'])
def recommendation():
    data = request.json
    print(data)
    return CropRecommendationModel.PredictCrop(x= data['humidity'],y= data['rainfall'],z= data['temp'])


@app.route('/cropDiseaseDetection',methods=['POST'])
def predict():
    print(request.json)
    data = request.json
    return predict_disease(data['image_url'])

if __name__== '__main__':
    app.run(debug = True)
