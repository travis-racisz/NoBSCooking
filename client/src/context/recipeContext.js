import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useAlert } from 'react-alert'

export const RecipeContext = React.createContext()
const userAxios = axios.create()


userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `bearer ${token}`
    return config
})

function RecipeProvider(props){ 
    const alert = useAlert()
    const initState = { 
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "", 
        errMsg: "", 
        savedRecipes: [],
        userInfo: {}
    }

    const [ userState, setUserState ] = useState(initState)

    function login(credentials){ 
        axios.post("/auth/login", credentials)
        .then(res => { 
            const {token, user} = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUserState(prev => ({ 
                ...prev, 
                user, 
                token
            }))
            getUsersInfo(credentials.username)
            console.log("fired")
        })
        .catch(err => handleAuthError(err.response.data.errMsg))
    }

    function signup(credentials){ 
        axios.post("/auth/signup", credentials)
        .then(res => { 
            const {user, token} = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUserState(prev => ({
                ...prev, 
                user,
                token
            }))

        })
        .catch(err => handleAuthError(err.response.data.errMsg))
    }

    function logout(){ 
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        localStorage.removeItem("userInfo")
        setUserState({ 
            user: {}, 
            token: "",
        })
    }


    function handleAuthError(errMsg){ 
        setUserState(prev => ({ 
            ...prev, 
            errMsg
        }))
    }

    function saveRecipe(id){ 
        userAxios.put(`/api/save/${id}`)
            .then(res => { 
                localStorage.setItem("user", JSON.stringify(res.data))
                setUserState(prev => ({ 
                    ...prev, 
                    user: res.data
                }))
                alert.show("Succesfully Saved Recipe")
            })
            .catch(err => console.log(err))
    }

    function deleteRecipe(id){ 
        userAxios.put(`/api/save/delete/${id}`)
            .then(res => { 
                localStorage.setItem("user", JSON.stringify(res.data))
                setUserState(prev => ({ 
                    ...prev, 
                    user: res.data
                }))
                alert.show("Succesfully deleted Recipe")
            })
            .catch(err => console.log(err))
    }

    function getUsersInfo(id){ 
        userAxios.get(`api/save/${id}`)
        .then(res => {
            setUserState(prev => ({ 
                ...prev, 
                userInfo: res.data
            }))
        })
            .catch(err => console.log(err))
    }

    // useEffect(() => { 
    //     getUsersInfo(userState.user._id)
    // }, [])

    
    
    return ( 
        <RecipeContext.Provider value = {{
            ...userState,
            login, 
            signup, 
            logout,
            saveRecipe, 
            getUsersInfo,
            deleteRecipe
        }}>

            {props.children}
        </RecipeContext.Provider>
    )
}

export default RecipeProvider