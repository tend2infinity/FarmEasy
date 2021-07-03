import pandas as pd
import json
import pickle
from sklearn.preprocessing import LabelEncoder

class CropProduction:
    def __init__(self):
        self.df = pd.read_csv('../Datasets/crop_production.csv')
        self.df.columns= self.df.columns.str.strip().str.lower()
        self.df = self.df.astype(dtype={'crop':'string','season':'string'})
        self.df['production'] = self.df['production'].fillna(0)
        self.df['p/a'] = self.df['production']/self.df['area']
        statepkl_file = open('../Models/state_encoder.pkl', 'rb')
        self.stateEncoder = pickle.load(statepkl_file)
        statepkl_file.close()
        seasonpkl_file = open('../Models/season_encoder.pkl','rb')
        self.seasonEnoder = pickle.load(seasonpkl_file)
        seasonpkl_file.close()
        croppkl_file = open('../Models/crop_encoder.pkl','rb')
        self.cropEncoder = pickle.load(croppkl_file)
        croppkl_file.close()
        pass

    def predictCropProductionByYears(self,state,district,crop):
        filtered_data = self.df[ (self.df['state_name'] == state) & (self.df['district_name'] == district) & (self.df['crop'] == crop)]
        return json.dumps(filtered_data.to_dict('records') )
    
    def predictCropProductionInYear(self,state,district,year):
        print(self.df.head(5))
        filtered_data = self.df[ (self.df['state_name'] == state) & (self.df['district_name'] == district) & (self.df['crop_year'] == year)]
        return json.dumps(filtered_data.to_dict('records'))

    def CropPredictionProduction(self,state,season,crop,area):
        model_file = open('../Models/cropProductionPred.pkl','rb')
        model = pickle.load(model_file)
        model_file.close()
        decodedState =  self.stateEncoder.fit_transform([state])
        decodedSeason = self.seasonEnoder.fit_transform([season])
        decodedCrop = self.cropEncoder.fit_transform([crop])
        pred = pd.DataFrame({'State_Name' : decodedState, 'Season' : decodedSeason , 'Crop' : decodedCrop , 'Area' : area}, index=[0])
        res = model.predict(pred)
        print(res)
        return {"status" : "OK"}