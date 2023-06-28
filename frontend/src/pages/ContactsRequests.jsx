import React from 'react';
import NavBar from '../components/NavBar'
import FriendList from "../components/FriendList";

export default function ContactsRequests({loggedUser: {username}, setLoggedIn}) {

    return (
        <>
            <aside style={{
                display: "flex",
                padding: "10px",
                color: "white",
                backgroundColor: "green",
            }} className="navBarContainer">
                <h1>{username.toString().toUpperCase()}</h1>
                <NavBar setLoggedIn={setLoggedIn}/>
            </aside>
            <div style={{display: "flex", width: "100%", height: "100%", overflowY: "auto"}}>
                <div style={{width: "40%"}} className="contactsContainer">
                    <FriendList username={username}/>
                </div>
            </div>
        </>
    )
}