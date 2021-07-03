import pandas as pd
from flask import jsonify
import pickle

class CropRecommendation:
    def __init__(self):
        cropEncoderPklFile = open('../Models/crop_recommendation_encoder.pkl','rb')
        self.cropEncoder = pickle.load(cropEncoderPklFile)
        cropEncoderPklFile.close()
        CropRecommendationPklFile = open('../Models/Crop_recommendation.pkl','rb')
        self.RecommendationModel = pickle.load(CropRecommendationPklFile)
        CropRecommendationPklFile.close()


    def PredictCrop(self ,x ,y ,z ):
        data = {'temperature':x,'humidity':y,'rainfall':z}
        pred = pd.DataFrame(data,index=[0])
        ans = self.RecommendationModel.predict(pred)
        labeled_ans = self.cropEncoder.inverse_transform([ans])
        print(labeled_ans)
        return jsonify(result = labeled_ans[0])


        