import React from 'react';
import Contacts from '../components/Contacts'
import ChatMessages from '../components/ChatMessages'
import NavBar from '../components/NavBar'

export default function Chat(loggedUser,{setLoggedIn}, currentChat, {setCurrentChat}) {

    function logOut() {
        setCurrentChat(null)
        localStorage.setItem('currentChat',null)
        setLoggedIn(false)
        localStorage.setItem('loggedIn',false)
    }

    return (
        <>
            <h1>Utente: {loggedUser.username}</h1>
            <aside className="contactsContainer">
                <NavBar logOut={logOut}/>
            </aside>
            <div className="navBarContainer">
                <Contacts/>
            </div>
            <div className="chatContainer">
                <ChatMessages loggedUser={loggedUser} currentChat={currentChat}/>
            </div>
        </>
    )
}