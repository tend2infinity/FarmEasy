# FarmEasy
![](https://github.com/Zeph-T/FarmEasy/blob/master/farmeasy-frontend/public/farmeasy%20(7).jpeg)
### We Innovate your cultivation!
FarmEasy is an agricultural and rural development project that uses the power of machine learning concepts to aid our hardworking farmers in three important aspects -
* __Crop Analyzation__
* __Crop Recommendation__
* __Disease Detection__
*** 
### Tech Stack and Concepts used:
* __Frontend:__ Reactjs, MaterialUI
* __Backend:__ Flask, Weather API
* __Database:__ Cloudinary (Cloud based database for storing image media)
* __ML Techniques__ Convolutional Neural Networks (CNN), transfer learning, decision trees and random forest regression
* __Tools:__ Git


## Crop Analyzation
![](https://github.com/Zeph-T/FarmEasy/blob/master/farmeasy-frontend/public/farmeasy%20(5).jpeg)
![](https://github.com/Zeph-T/FarmEasy/blob/master/farmeasy-frontend/public/farmeasy%20(6).jpeg)
<br>
From a farmer's perspective its very important to know which crop should be sown in which region to get the maximum yield! Our crop Analyzation feature address this very issue in a statistical way. Basically we take some inputs from the user like state, district and a customization of crops OR year and based on these inputs we produce a data analytic of the production per unit area for various crops in the selected year or the past trends from various years. Through this analytic farmers can have a decent idea about which crop would be the best suited for a particular region. We used __random forest regression__ for this feature.

## Crop Recommendation
![](https://github.com/Zeph-T/FarmEasy/blob/master/farmeasy-frontend/public/farmeasy%20(4).jpeg)
![](https://github.com/Zeph-T/FarmEasy/blob/master/farmeasy-frontend/public/farmeasy%20(3).jpeg)
<br>
Sometimes the analytics aren't enough and we cannot expect rural people to understand all our statistical data based on production per unit area. So just to have a clear answer for "Which is the crop that would provide the best yield in a particular region?", we have our Crop recommendation feature. We take two inputs state and district and we pass these values to __weather API__ which returns the climatic condition data for the selected region in the last week and by using this data our model predicts only ONE crop that will provide the best yield based on the large dataset which we provide to our model. We have used __decision tree__ for this feature.

## Disease Detection
![](https://github.com/Zeph-T/FarmEasy/blob/master/farmeasy-frontend/public/farmeasy%20(2).jpeg)
![](https://github.com/Zeph-T/FarmEasy/blob/master/farmeasy-frontend/public/farmeasy%20(1).jpeg)
<br>
The most vulnerable setback a farmer can have is the failure of crops due to some disease! Sometimes when a farmer in unable to detect the infection and our Disease Detection model helps them with this. It takes an image input in jpg or png format and predicts 6 most relevant results related to the disease with which the crop might be infected! Since the model does not take crop type as an input from the user, the results can contain various diseases from different crops so the user should have knowledge about which crop's photograph is being uploaded to our model so that he can easily conclude from the results, which disease is most probably infecting his crop. We used __Convolutional Neural Networks (CNN)__ and __transfer learning__ algoritms to predict and we used a cloud based database to store images uploaded by the user from the frontend.

