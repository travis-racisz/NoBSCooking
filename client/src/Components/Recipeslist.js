import React, { useContext } from "react"
import { useHistory } from "react-router-dom";
import { RecipeContext } from "../context/recipeContext";



function Recipieslist(props){ 
    const { token, saveRecipe } = useContext(RecipeContext)
    let history = useHistory();
    const {recipeList} = props

    function pushToNextPage(id){ 
        history.push(`/details/${id}`)
    }

   
    return ( 
        <>
        {recipeList.map((item) => 
            <div className = "main-home"> 
                <img className = "image" key = {item.id} alt = "image not found" src ={`https://spoonacular.com/recipeImages/${item.id}-636x393.jpg`}></img>
                <h1 key = {item.title} className = "recp-title">{item.title}</h1>
                <h4 key = {item.readyInMinutes} className = "recp-sub-title">Ready in {item.readyInMinutes} minutes</h4>
                <h4 key = {item.servings} className = "recp-sub-title">Serves {item.servings}</h4>
                <div className = "button-group">
                    <button onClick = {() => {
                        pushToNextPage(item.id)
                        
                        }}>See More</button>
                        {token ? <button onClick = {() => saveRecipe(item.id)}>Save</button> : ""}
                </div>
            </div>
                )}
        </>

    )
}



export default Recipieslist