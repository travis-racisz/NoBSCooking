import React, {useEffect, useContext, useState} from "react"
import { RecipeContext } from "../context/recipeContext"
import RandomRecipes from "./RandomRecipes"
import axios from "axios"

    function Home(){ 
        const [randomRecipe, setRandomRecipe] = useState({})
        useEffect(() => { 
            getRandomRecipes()
        },[])

        // const {  getRandomRecipes, randomRecipe } = useContext(RecipeContext)
        // const recipe = {recipe: { 
        //     recipes: [{
        //         title: "pizza", 
        //         readyInMinutes: 25, 
        //         servings: 3, 
        //         image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=714&q=80",
        //         extendedIngredients: ["dough", "Tomato Sauce", "Cheese", "Peperoni"], 
        //         analyzedInstructions: [{steps: ["Pour warm water into the bowl of stand mixer; mix in yeast and sugar and let dissolve. Add 2 teaspoons olive oil, salt, and bread flour. Knead mixture together with a dough hook attachment until dough is very smooth, soft, and elastic.", 
        //             "Drizzle remaining olive oil over the bottom of a 10x14-inch Detroit-style pizza pan and spread around with your fingers. Place dough in the center; pull and stretch into a roughly rectangular shape with oiled fingers. Cover and let rise until doubled in volume, about 1 hour. Prepare sauce and cheese in the meantime. ", 
        //             "Combine marinara sauce, oregano, red pepper flakes, and garlic powder in a saucepan over medium-low heat. Simmer to fully hydrate the oregano and garlic, about 15 minutes. ",
        //             "Preheat the oven to 500 to 550 degrees F (260 to 288 degrees C). ", "Dice Monterey Jack and Cheddar cheese into small cubes. Toss lightly to mix together. ", 
        //             "Rub fingertips with some olive oil from the pan. Press out air from the dough while stretching and pushing into a rectangle that goes all the way to the edges of the pan. Stretch up the sides about 1/2 inch or so",
        //             "Lay most of the pepperoni onto the dough. Scatter cheese cubes evenly on top, making sure to fully cover all the edges where dough meets the pan. Ladle sauce on top in 3 long strips. Arrange remaining pepperoni over the sauce. ",
        //             "Bake in the preheated oven until pizza is somewhere between golden brown and golden black, about 15 minutes. Let cool for 5 minutes. ",
        //             "Very carefully slide pizza onto a cutting board using a spatula. Cut into individual pieces using the lines of sauce as a guide."],}]
        //     }]
        // }}
     
 

        function getRandomRecipes(){ 
            console.log("fired ")
            axios({
                "method":"GET",
                "url":"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random",
                "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                "x-rapidapi-key":"bb0f200289mshe78ca82c1ce41f8p10d1a9jsn884393783c99"
                },"params":{
                "number":"10"
                }
                })
                .then(res => setRandomRecipe(() => ({ 
                    ...res.data
                })))
                .catch(err => console.log(err))
            }
       
        


    console.log(randomRecipe)
    return( 
        <div> 
            <div className = "headline"> <p>NoBSCooking, Recipes without all of the BS.</p>
            <p>Dont know what to make tonight? Check out these popular recipes or search for a specific recipe!</p></div>
            <RandomRecipes recipe = {randomRecipe} />
        </div>
    )
}


export default Home