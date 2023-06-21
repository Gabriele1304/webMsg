import React from 'react';
import './Login.css'

export default function Register(isRegistered,{setIsRegistered}) {

    async function sendRegisterForm(e) {
        e.preventDefault()
        let username = e.target.username.value
        let password = e.target.password.value
        await fetch("http://localhost:3001/api/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username, password: password})
        }).then(r => {
            e.target.password.value = "";
            //200 ok, 401 username already exists
            console.log(r)
            switch (r.status) {
                case 200:
                    return r.json();
                    break;
                case 401:
                    throw new Error("username già presente");
                    break;
            }
        })
            .then(response => {
                console.log(response)
                setLoggedUser({username: username, password: password});
                localStorage.setItem('loggedUserName', username)
                localStorage.setItem('loggedUserPassword', password)
                setIsRegistered(true)
                localStorage.setItem('isRegistered', true)
            })
            .catch(e => console.log(e))

        setIsRegistered(true)
        localStorage.setItem('isRegistered', true)
    }
    return (
        <>
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
                    <input type="submit" value="Register"/>
                </form>
            </div>
        </>
    )
}