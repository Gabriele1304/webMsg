import React from 'react';
import './Login.css'

export default function Register(isRegistered,{setIsRegistered}) {

    function sendRegisterForm(e){
        e.preventDefault()

        setIsRegistered(true)
        localStorage.setItem('isRegistered',true)
    }

    return (
        <>
            <div id="register-div">
                <h1>Registrati</h1>
                <form id="username-password" onSubmit={(e) => sendRegisterForm(e)}>
                    <div>
                        <label>Username:</label>
                        <input type="text" id="username-input" placeholder="inserire nome utente"/>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" id="password-input" placeholder="password"/>
                    </div>
                    <input type="submit" value="Register"/>
                </form>
            </div>
        </>
    )
}