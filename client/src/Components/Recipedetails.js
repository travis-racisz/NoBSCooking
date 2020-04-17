import React, { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { RecipeContext } from "../context/recipeContext"





function Recipedetails(){ 
    const {id} = useParams()
    const { token, saveRecipe } = useContext(RecipeContext)
    const [recipeDetails, setRecipeDetails] = useState({})


    const boldTitle = { 
        fontWeight: 'bold', 
        marginBottom: '10pt', 
    }

    function getDetails(){ 
         axios({
            "method":"GET",
            "url": `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=3cada9b92e194b29af52f3e43a75c988`,
            "headers":{
            "content-type":"application/json",
            // "x-rapidapi-host":"spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            // "x-rapidapi-key":"bb0f200289mshe78ca82c1ce41f8p10d1a9jsn884393783c99"
            },"params":{
            "number":"1"
            }
            })
            .then(res => setRecipeDetails(() => ({
               ...res
            })))
            .catch(err => console.log(err))
    }


    useEffect(() => { 
        getDetails()
    }, [])


    // const recipeId = recipeDetails.data.id

    return( 
        <div className = "main-home"> 
            <h1 className = "rand-title">{recipeDetails.data && recipeDetails.data.title}</h1>
            <img alt = "img" src = {`https://spoonacular.com/recipeImages/${recipeDetails.data && recipeDetails.data.id}-636x393.jpg`}></img>
            <h4 className = "subtitle">ready in {recipeDetails.data && recipeDetails.data.readyInMinutes}</h4>
            <h4 className = "subtitle">serves {recipeDetails.data && recipeDetails.data.servings}</h4>
            <div className = "recipe-content2">
               <b style = {boldTitle}>Ingredients</b> 
               
                <ul> {recipeDetails.data && recipeDetails.data.extendedIngredients.map(ingredient => <p className = "recipe-content4">{ingredient.original}</p>)}</ul>
            </div>
            <div> <b>Instructions</b>
                {recipeDetails.data && recipeDetails.data.analyzedInstructions[0].steps.map(step => <ul className = "recipe-content3"><b>step {step.number}.</b> {step.step}<br></br></ul>)}
            </div>
            <div className = "button-group">
                        {token ? <button onClick = {() => saveRecipe(id)}>Save</button> : ""}
                </div>
        </div> 

    )
}


export default Recipedetails