import React from 'react';
import './Login.css'

export default function Login(loggedUser, {setLoggedUser}, loggedIn, {setLoggedIn}, isRegistered, {setIsRegistered}) {

    async function loginFetch(username,password) {
        await fetch("http://localhost:3001/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username, password: password})
        }).then(r => {
            e.target.password.value = "";
            //200 ok, 401 wrong password, 404 no user
            console.log(r)
            switch (r.status) {
                case 200:
                    return r.json();
                    break;
                case 401:
                    throw new Error("password errata");
                    break;
                case 404:
                    e.target.username.value = "";
                    throw new Error("Username non esistente");
                    break;
            }
        })
            .then(response => {
                console.log(response)
                setLoggedUser({username: username, password: password});
                localStorage.setItem('loggedUserName', username)
                localStorage.setItem('loggedUserPassword', password)
                setLoggedIn(true)
                localStorage.setItem('loggedIn', true)
            })
            .catch(e => console.log(e))
    }
    async function submitLogin(e) {
        e.preventDefault()
        let username = e.target.username.value
        let password = e.target.password.value
        await loginFetch(username,password)
    }

    function notRegistered(e) {
        e.preventDefault()
        setIsRegistered(false)
        localStorage.setItem('isRegistered', false)
    }

    return (
        <>
            <div id="login-div">
                <form id="loginFormId" onSubmit={(e) => submitLogin(e)}>
                    <h1>Login </h1>
                    <div>
                        <label>Username:</label>
                        <input type="text" name="username" placeholder="inserire nome utente"/>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password" placeholder="password"/>
                    </div>
                    <input type="submit" name="loginButton" value="Login"/>
                    <input type="button" value="Registrati" onClick={(e) => notRegistered(e)}/>
                </form>
            </div>
        </>
    )
}