import React, {useContext} from "react"
import {RecipeContext} from "../context/recipeContext"

function RandomRecipes(props){ 
    const { token, saveRecipe } = useContext(RecipeContext)
        const {recipe} = props
        const boldTitle = { 
            fontWeight: 'bold', 
            marginBottom: '10pt', 
        }
        console.log(recipe)
        console.log(token)
    return ( 
        <>
        {recipe.recipes && recipe.recipes.map(recipe => 
            (<div className ="main-home"> 
                    <h1 className = "rand-title">{recipe.title}</h1>
                    <span className = "subtitle">Ready in {recipe.readyInMinutes}</span>
                    <span className = "subtitle">Serves {recipe.servings}</span>
                    <img src = {recipe.image}></img>
                    <span className = "recipe-content2" style = {boldTitle}>Ingredients <hr width = "30%"></hr></span>
                    {recipe.extendedIngredients.map(ingredient => (<p className = "recipe-content4">{ingredient.original}</p>))}
                    <span className = "recipe-content2" style = {boldTitle}>Instructions  <hr width = "30%"></hr><br></br>
                    <div>{recipe.analyzedInstructions[0] !== undefined ? recipe.analyzedInstructions[0].steps.map(step => <p className = "recipe-content3"><b>step {step.number}</b>  {step.step}</p>) : ""}</div>
                    </span> 
                    <div className = "button-group">
                        {token ? <button onClick = {() => saveRecipe(recipe.id)}>Save</button> : ""}
                </div>
            </div>)
                    )}
        </>

    )
}

export default RandomRecipes