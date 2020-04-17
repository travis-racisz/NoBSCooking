import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App"
import {BrowserRouter} from "react-router-dom"
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import RecipeProvider from "./context/recipeContext"
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'


const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 3000,
  offset: '10px',
  type: "success",
  // you can also just use 'scale'
  transition: transitions.SCALE
}

ReactDOM.render(
  <BrowserRouter>
    <AlertProvider template = {AlertTemplate} {...options}>
      <RecipeProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </RecipeProvider>
      </AlertProvider>
  </BrowserRouter>,
  document.getElementById('root')
);


