import React, { useState } from "react"
import axios from "axios"
import Recipeslist from "./Recipeslist"
import RandomRecipes from "./RandomRecipes"


function Recipesform(){ 
    const [recipeList, setRecipeList] = useState([])
    const initalInputs = { 
        recipeName: "", 
        diet: "", 
        cuisine: "",
        exclude: ""
    }
    const [inputs, setInputs] = useState(initalInputs)
    const {recipeName, diet, cuisine, exclude} = inputs
    let url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=${recipeName}&diet=${diet}&cuisine=${cuisine}&excludeIngredients=${exclude}&instructionsRequired=true`
    

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
          ...prevInputs,
          [name]: value
        }))
      }

      function handleSubmit(e){ 
          e.preventDefault()
        axios({
            "method":"GET",
            "url": url,
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key":"bb0f200289mshe78ca82c1ce41f8p10d1a9jsn884393783c99"
            },"params":{
            "number":"100", 
            }
            })
            .then(res => setRecipeList(() => {return[
                ...res.data.results]}
            ))
            .catch(err => console.log(err))
        }
    return( 
        <div className = "container">
        <form className = "form-container" onSubmit = {handleSubmit}>
            <input 
            type = "text"
            value = {recipeName}
            onChange = {handleChange} 
            name = "recipeName"
            placeholder = "Recipe" />
                <input 
                type = "text"
                value = {exclude}
                onChange ={handleChange}
                name = "exclude"
                placeholder = "Exclude Ingredients" />
                <br></br>
                Diet
            <select className = "select-css" name = "diet" value = {diet} onChange = {handleChange} placeholder = "diet"> 
                <option value = "Vegan">Vegan</option>
                <option value = "Vegetarian"> Vegetarian</option>
                <option value = "Ketogenic">Ketogenic</option>
                <option value = "Lacto-Vegetarian">Lacto-Vegetarian</option>
                <option value = "Ovo-Vegetarian">Ovo-Vegetarian</option>
                <option value = "Pescetarian">Pescetarian</option>
                <option value = "Paleo">Paleo</option>
                <option value = "Primal">Primal</option>
                <option value = "Whole30">Whole30</option>
                <option selected value = "">----</option>
            </select>
            Cuisine
            <select className = "select-css" name = "cuisine" value = {cuisine} onChange = {handleChange}> 
                <option value = "African">African</option>
                <option value = "American">American</option>
                <option value = "British">British</option>
                <option value = "Cajun">Cajun</option>
                <option value = "Caribbean">Caribbean</option>
                <option value = "Chinese">Chinese</option>
                <option value = "Eastern European">Eastern European</option>
                <option value = "European">European</option>
                <option value = "French">French</option>
                <option value = "German">German</option>
                <option value = "Greek">Greek</option>
                <option value = "Indian">Indian</option>
                <option value = "Irish">Irish</option>
                <option value = "Italian">Italian</option>
                <option value = "Japanese">Japanese</option>
                <option value = "Jewish">Jewish</option>
                <option value = "Korean">Korean</option>
                <option value = "Latin American">Latin American</option>
                <option value = "Mediterranean">Mediterranean</option>
                <option value = "Mexican">Mexican</option>
                <option value = "Middle Eastern">Middle Eastern</option>
                <option value = "Nordic">Nordic</option>
                <option value = "Southern">Southern</option>
                <option value = "Spanish">Spanish</option>
                <option value = "Thai">Thai</option>
                <option value = "Vietnamese">Vietnamese</option>
                <option selected value = "">----</option>
            </select>
            <button onClick = {handleSubmit}>Submit</button>
        </form> 

        <Recipeslist recipeList = {recipeList} />
        </div>
    )
}

export default Recipesform