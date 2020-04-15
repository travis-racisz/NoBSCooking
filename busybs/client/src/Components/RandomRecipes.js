import React from "react"


function RandomRecipes(props){ 
        const {recipe} = props
        const boldTitle = { 
            fontWeight: 'bold', 
            marginBottom: '10pt', 
        }
        let i = 1
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
            </div>)
                    )}
        </>

    )
}

export default RandomRecipes