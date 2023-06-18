import React from 'react';
import './Login.css'

export default function Login(loggedUser,{setLoggedUser},loggedIn,{setLoggedIn},isRegistered,{setIsRegistered}) {
    function submitLogin(e) {
        e.preventDefault()
        let username = document.getElementById("username-input").value
        let password = document.getElementById("password-input").value
        setLoggedUser({username: username, password: password});
        localStorage.setItem('loggedUserName',username)
        localStorage.setItem('loggedUserPassword',password)
        setLoggedIn(true)
        localStorage.setItem('loggedIn',true)
    }

    function notRegistered(e){
        e.preventDefault()
        setIsRegistered(false)
        localStorage.setItem('isRegistered',false)
    }

    return (
        <>
            <div id="login-div">
                <form id="username-password" onSubmit={(e) => submitLogin(e)}>
                    <h1>Login </h1>
                    <div>
                        <label>Username:</label>
                        <input type="text" id="username-input" placeholder="inserire nome utente"/>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" id="password-input" placeholder="password"/>
                    </div>
                    <input type="submit" value="Login"/>
                    <input type="button" value="Registrati" onClick={(e) => notRegistered(e)}/>
                </form>
            </div>
        </>
    )
}