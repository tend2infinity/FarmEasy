import os
import re
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
from flask import Flask,request
from flask_cors import CORS
from Classes.CropProduction import CropProduction
from Classes.CropDiseaseDetection import predict_disease
from Classes.CropRecommendation import CropRecommendation

app = Flask(__name__)
CORS(app)


@app.route('/cropProduction',methods = ['POST'])
def prodiction():
    data = request.json
    print(data)
    CropProductionModel = CropProduction()
    res =  CropProductionModel.predictCropProductionInYear(data['state'],data['district'],int(data['year']))
    print(res)
    return res


@app.route('/cropProductionByYear',methods =['POST'])
def cropProdByYear():
    data = request.json
    CropProductionModel = CropProduction()
    res= CropProductionModel.predictCropProductionByYears(data['state'],data['district'],data['crop'])
    print(res)
    return res

@app.route('/cropPredictByProduction',methods=['POST'])
def func():
    data = request.json
    CropProductionModel = CropProduction()
    res =  CropProductionModel.CropPredictionProduction(data['state'], data['season'], data['crop'],data['area'])
    print(res)
    return res


@app.route('/cropRecommendation',methods = ['POST'])
def recommendation():
    data = request.json
    print(data)
    CropRecommendationModel  = CropRecommendation()
    return CropRecommendationModel.PredictCrop(x= data['humidity'],y= data['rainfall'],z= data['temp'])


@app.route('/cropDiseaseDetection',methods=['POST'])
def predict():
    print(request.json)
    data = request.json
    return predict_disease(data['image_url'])

if __name__== '__main__':
    app.run(debug = True)
