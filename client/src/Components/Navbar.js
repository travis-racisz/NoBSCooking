import React, { useContext } from "react"
import {Link} from "react-router-dom"
import "../CSS/styles.css"
import { faHome, faSignInAlt, faSearch, faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RecipeContext } from "../context/recipeContext";

function Navbar(){ 
    const { token, logout } = useContext(RecipeContext)
    return (
    <div> 
        <nav className = "navbar"> 
            <ul className = "navbar-nav">
                <Link className = "nav-item" exact to = "/">
                    <li className ="nav-link">
                        <FontAwesomeIcon icon={faHome} />
                        <span className = "link-text">Home</span>
                    </li>
                </Link>
            
                <Link className = "nav-item" exact to = "/recipes">
                    <li className = "nav-link">
                        <FontAwesomeIcon icon={faSearch} />
                        <span className = "link-text">Search</span>
                    </li>
                </Link>
          
                <Link className = "nav-item" exact to = "/account">
                    <li className = "nav-link">
                        <FontAwesomeIcon icon={faUser} />
                        <span className = "link-text">Account</span>
                    </li>
                </Link>
                {!token ? 
                <Link className = "nav-item" exact to = "/auth" >
                    <li className = "nav-link">
                        <FontAwesomeIcon icon={faSignInAlt} />
                        <span className = "link-text">Sign in</span>
                    </li>
                </Link>
                :
                <Link className = "nav-item" exact to = "/auth" onClick = {logout}>
                    <li className = "nav-link">
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        <span className = "link-text">Sign out</span>
                    </li>
                </Link>}
                


                {/* <Link className = "nav-item" exact to = "/contact">
                    <li className = "nav-link">
                        <FontAwesomeIcon icon = {faEnvelope}/>
                        <span className = "link-text">Contact</span>
                    </li>
                </Link> */}
            </ul>
        </nav>
    </div>
    )
}

export default Navbar