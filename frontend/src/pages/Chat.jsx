import React, {useState} from 'react';
import Contacts from '../components/Contacts'
import ChatMessages from '../components/ChatMessages'
import NavBar from '../components/NavBar'
import {Route} from "react-router-dom";

export default function Chat({loggedUser, setLoggedIn, loggedIn}) {
    const [currentChat, setCurrentChat] = useState((localStorage.getItem("currentChat") != null) ? localStorage.getItem("currentChat") : null);

    return (
        <>
            <aside style={{
                display: "flex",
                padding: "10px",
                color: "white",
                backgroundColor: "green",
            }} className="navBarContainer">
                <h1>{loggedUser.username.toString().toUpperCase()}</h1>
                <NavBar setLoggedIn={setLoggedIn} setCurrentChat={setCurrentChat} />
            </aside>
            <div style={{display: "flex", width: "100%", height: "100%", overflowY: "auto"}}>
                <div style={{width: "20%"}} className="contactsContainer">
                    <Contacts setCurrentChat={setCurrentChat} loggedIn={loggedIn}/>
                </div>
                <div style={{width: "80%", height: "100%", overflowY: "auto"}} className="chatContainer">
                    <ChatMessages loggedUser={loggedUser} currentChat={currentChat}/>
                </div>
            </div>
        </>
    )
}