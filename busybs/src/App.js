import React, { useContext } from 'react';
import {Route, Switch} from "react-router-dom"
import './CSS/styles.css';
import Account from "./Components/Account"
import Navbar from "./Components/Navbar"
import Home from "./Components/Home"
import Recipes from './Components/Recipes';
import Recipedetails from './Components/Recipedetails';
import Authform from "./Components/Authform"
import { RecipeContext } from './context/recipeContext';


function App(){ 
  const { token } = useContext(RecipeContext)

  return ( 
    <>
      <Navbar />
      <Switch>
        <Route exact path = "/" render = {() => <Home />} />
        <Route exact path = "/recipes" render = {() => <Recipes />} />
        <Route path = "/details/:id" render = {() => <Recipedetails />} />
        <Route exact path = "/auth" render = {() => !token ? <Authform /> : <Home />} />
        <Route exact path = "/account" render = {() => !token ? <Authform /> : <Account />} />
      </Switch>
    </>
  )
}

export default App;