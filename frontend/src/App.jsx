import './App.css'
import React, {useState} from 'react';
import Login from "./pages/Login";
import Chat from "./pages/Chat";

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {Route, Routes, useNavigate,} from "react-router-dom";
import ContactsRequests from "./pages/ContactsRequests";

export default function App() {
    const [isRegistered, setIsRegistered] = useState(true)
    const [loggedIn, setLoggedIn] = useState((localStorage.getItem("loggedIn") != null) ? localStorage.getItem("loggedIn") : false)
    const [loggedUser, setLoggedUser] = useState({
        username: (localStorage.getItem("loggedUserName") != null ? localStorage.getItem("loggedUserName") : null),
        password: (localStorage.getItem("loggedUserPassword") != null ? localStorage.getItem("loggedUserPassword") : null)
    })

    return (<div id="container">
            <main id="main-content">
                <Routes>
                    <Route path="/" element={loggedIn ?
                        <Chat loggedUser={loggedUser} setLoggedIn={setLoggedIn} loggedIn={loggedIn}/> :
                        <Login loggedUser={loggedUser} setLoggedUser={setLoggedUser} loggedIn={loggedIn}
                               setLoggedIn={setLoggedIn} isRegistered={isRegistered} setIsRegistered={setIsRegistered}/>
                    }/>
                    <Route path="/contactsRequests" element={<ContactsRequests loggedUser={loggedUser} setLoggedIn={setLoggedIn}/>}/>
                    <Route path="/settings" element={"TODO"}/>
                </Routes>

                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </main>
        </div>

    )

}