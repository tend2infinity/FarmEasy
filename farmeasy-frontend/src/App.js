import React from 'react'
import './App.css';
import Home from './components/home'
import Navbar from './components/navbar';
import Analyzation from './components/cropAnalyzation';
import Recommendation from './components/cropRecommendation';
import DiseaseDetection from './components/diseaseDetection';
import { BrowserRouter, Route , Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Navbar />
      <Switch>
      <Route exact path="/" >
       <Home />
     </Route>
      <Route exact path="/analyzation" >
       <Analyzation />
     </Route>
      <Route exact path="/recommendation" >
       <Recommendation />
     </Route>
      <Route exact path="/diseasedetection" >
       <DiseaseDetection />
     </Route>
      </Switch>
      </BrowserRouter>

      
    </div>
  );
}

export default App;
