import React from 'react';
import {toast} from "react-toastify";

export default function Login({isRegistered, setIsRegistered, setLoggedIn, setLoggedUser}   ) {
    const host = "web-msg-be.vercel.app"

    async function submitLogin(e) {
        e.preventDefault()
        let username = e.target.username.value
        let password = e.target.password.value
        await loginFetch(username, password, e)
    }
    const loginFetch = async function (username, password, e) {
        if (username === "" || password === "") {
            toast("Inserire username e password");
        } else await fetch(host+"/api/user/login", {
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
                case 401:
                    toast("password errata");
                    throw new Error("password errata");
                case 404:
                    e.target.username.value = "";
                    toast("Username non esistente");
                    throw new Error("Username non esistente");
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
    function notRegistered(e) {
        e.preventDefault()
        setIsRegistered(!isRegistered)
        localStorage.setItem('isRegistered', isRegistered)
    }
    async function sendRegisterForm(e) {
        e.preventDefault()
        let username = e.target.username.value
        let password = e.target.password.value
        e.target.password.value = "";
        if (username === "" || password === "") {
            toast("Inserire username e password");
        } else {
            await fetch(host+"/api/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username: username, password: password})
            }).then(async r => {
                //200 ok, 401 username already exists
                // console.log(r)
                switch (r.status) {
                    case 200:
                        await loginFetch(username, password, e)
                        setIsRegistered(true)
                        localStorage.setItem('isRegistered', true)
                        break;
                    case 401:
                        e.target.username.value = "";
                        toast("username già presente");
                        throw new Error("username già presente");
                    case 400:
                        toast("inserire un username ed una password");
                        throw new Error("inserire un username ed una password");
                }
            })
                .catch(e => console.log(e))
        }
    }

    return (
        <>
            {isRegistered ? (
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
            ) : (
            <div id="register-div">
                <h1>Registrati</h1>
                <form id="registerFromId" onSubmit={(e) => sendRegisterForm(e)}>
                    <div>
                        <label>Username:</label>
                        <input type="text" name="username" placeholder="inserire nuovo nome utente"/>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password" placeholder="password"/>
                    </div>
                    <input type="submit" value="Registrati"/>
                    <input type="button" value="Login" onClick={(e) => notRegistered(e)}/>
                </form>
            </div>
            )}
        </>
    )
}