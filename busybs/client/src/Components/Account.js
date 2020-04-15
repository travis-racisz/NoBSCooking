import React, { useState, useEffect } from "react"
import axios from "axios"

function Account(){ 
    const [ accountInfo, setAccountInfo ] = useState([])
    const userData = JSON.parse(localStorage.getItem("user"))
    const uniqueValues = getUniqueValues(userData.recipes)
    const recipes = uniqueValues.join(",")
    console.log(recipes)

    useEffect(() => { 
        getAccountInfo()
    }, [])

    function getUniqueValues(array){ 
        let uniqueArray = []
        for(let i=0; i < array.length; i++){
            if(uniqueArray.indexOf(array[i]) === -1) {
                uniqueArray.push(array[i]);
            }
        }
        return uniqueArray;
    }

    function getAccountInfo(){
    axios({
        "method":"GET",
        "url":`https://api.spoonacular.com/recipes/informationBulk?ids=${recipes}&apiKey=3cada9b92e194b29af52f3e43a75c988`,
        "headers":{
        "content-type":"application/json",
        // "x-rapidapi-host":"spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        // "x-rapidapi-key":"bb0f200289mshe78ca82c1ce41f8p10d1a9jsn884393783c99"
        }
        })
        .then(res => setAccountInfo(prev => [...prev, res.data]))
        .catch(err => console.log(err))
    }


    console.log(accountInfo)
    return(
        <div> 
            <h1> Welcome, {userData.username}</h1> 

            <h4>Saved Recipes </h4>
            {accountInfo[0] && accountInfo[0].map(item => 
             <div className = "main-home"> 
                <img className = "image" key = {item.id} alt = "image not found" src ={`https://spoonacular.com/recipeImages/${item.id}-636x393.jpg`}></img>
                <h1 key = {item.title} className = "recp-title">{item.title}</h1>
                <h4 key = {item.readyInMinutes} className = "recp-sub-title">Ready in {item.readyInMinutes} minutes</h4>
                <h4 key = {item.servings} className = "recp-sub-title">Serves {item.servings}</h4>
                <div className = "ingredients-list">
               <b >Ingredients</b> 
               
                <ul> {item.extendedIngredients && item.extendedIngredients.map(ingredient => <p className = "recipe-content4">{ingredient.original}</p>)}</ul>
            </div>
            <div> <b>Instructions</b>
                {item.analyzedInstructions[0] && item.analyzedInstructions[0].steps.map(step => <ul className = "recipe-content3"><b>step {step.number}.</b> {step.step}<br></br></ul>)}
            </div>
            </div>
                )}

        </div>
    )
    }

export default Account