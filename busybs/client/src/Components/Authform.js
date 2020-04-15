import React, {useState, useContext} from 'react'
import { RecipeContext } from '../context/recipeContext'




function Authform(){ 

    const {login, signup, errMsg} = useContext(RecipeContext)

    const initialInputs = { 
        username: "", 
        password: ""
    }

    const [ inputs, setInputs ] = useState(initialInputs)
    const [ toggle, setToggle ] = useState(false)

    function handleToggle(){ 
        setToggle(prev => !prev)
    }


    function handleChange(e){ 
       const {name, value} = e.target
       setInputs(prev => ({ 
           ...prev,
           [name]: value
       }))
    }




    const { username, password } = inputs

    return( 
        <div className = "auth-form"> 
            {!toggle ? 
            <>
                <input 
                type = "text"
                placeholder = "Username"
                value = {username}
                name = "username"
                onChange = {handleChange}/>
                <input 
                type = "password"
                placeholder = "Password"
                value = {password}
                name = "password"
                onChange = {handleChange}/>
                <button onClick = {() => login(inputs)}>Login</button>
                <button onClick = {() => handleToggle()}>Not a member? Sign Up</button>
                <p>{errMsg}</p>
                </>
            : 
            <>
            <input 
                type = "text"
                placeholder = "Username"
                value = {username}
                name = "username"
                onChange = {handleChange}/>
                <input 
                type = "password"
                placeholder = "Password"
                value = {password}
                name = "password"
                onChange = {handleChange}/>
                <button onClick = {() => signup(inputs)}>Sign Up</button>
                <button onClick = {() => handleToggle()}>already a member? Log In</button>
                <p>{errMsg}</p>
            </>
            }
        
        </div>
    )
}

export default Authform