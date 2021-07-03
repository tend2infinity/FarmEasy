import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
from flask import Flask,request
from Classes.CropProduction import CropProduction
from Classes.CropDiseaseDetection import predict_disease
CropProductionModel = CropProduction()

app = Flask(__name__)

@app.route("/cropPrediction",methods = ['POST'])
def home():
    data = request.json
    return data


@app.route('/cropProduction',methods = ['POST'])
def prodiction():
    state = request.form['state']
    district = request.form['district']
    year = int(request.form['year'])
    return CropProductionModel.predictCropProductionInYear(state,district,year)


@app.route('/cropProductionByYear',methods =['POST'])
def cropProdByYear():
    state = request.form['state']
    district = request.form['district']
    crop = request.form['year']
    return CropProductionModel.predictCropProductionByYears(state,district,crop)


@app.route('/cropPredictByProduction',methods=['POST'])
def func():
    state = int(request.form['state'])
    season = int(request.form['season'])
    crop  =  int(request.form['crop'])
    return CropProductionModel.CropPredictionProduction(state,season,crop)


@app.route('/cropRecommendation',methods = ['POST'])
def recommendation():
    data = request.json
    return data


@app.route('/cropDiseaseDetection',methods=['POST'])
def predict():
    data = request.form['image_url']
    return predict_disease(data)

if __name__== '__main__':
    app.run(debug = True)
