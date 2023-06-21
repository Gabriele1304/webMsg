import './App.css'
import React, {useState} from 'react';
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import { io } from "socket.io-client";


export default function App() {
    localStorage.setItem("loggedIn", false);
    const registerState = [isRegistered, setIsRegistered] = useState(true)
    const loggedState = [loggedIn, setLoggedIn] = useState((localStorage.getItem("loggedIn") != null) ? localStorage.getItem("loggedIn") : false)

    const userInfo = [loggedUser, setLoggedUser] = useState({username: (localStorage.getItem("loggedUserName") != null ? localStorage.getItem("loggedUserName") : null),
        password: (localStorage.getItem("loggedUserPassword") != null ? localStorage.getItem("loggedUserPassword") : null)})

    const chatState = [currentChat, setCurrentChat] = useState((localStorage.getItem("currentChat") != null) ? localStorage.getItem("currentChat") : null);


    return (<div id="container">
            <main id="main-content">
                {
                    loggedIn ? <>{Chat(loggedUser, {setLoggedIn}, currentChat, {setCurrentChat})}</> :
                        isRegistered ? <>{Login(loggedUser, {setLoggedUser}, loggedIn, {setLoggedIn}, isRegistered, {setIsRegistered})}</> :
                            <>{Register(isRegistered, {setIsRegistered})}</>
                }
            </main>
        </div>

    )

    // <Login() loggedUser={loggedUser} setLoggedUser={setLoggedUser}

    // <Chat logOut={logOut} loggedUser={loggedUser}/>
}


/*
{!loggedIn ? !isRegistered ? (<Register sendRegisterForm={sendRegisterForm}/>):
                (<Login submitLogin={submitLogin} notRegistered={notRegistered}/>) :
                (<>{Chat(logOut, loggedUser,currentChat)}</>)}



loggedIn ? ((<>{Chat({logOut}, loggedUser,currentChat)}</>)):
                isRegistered ? (<>{Login({submitLogin},{notRegistered})}</> ):
                    (<Register sendRegisterForm={sendRegisterForm} />)

 */
