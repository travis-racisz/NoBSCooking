import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App"
import {BrowserRouter} from "react-router-dom"
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import RecipeProvider from "./context/recipeContext"


ReactDOM.render(
  <BrowserRouter>
    <RecipeProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </RecipeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);


