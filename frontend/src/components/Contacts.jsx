import ContactsItem from "./ContactsItem";
import {useEffect, useState} from "react";

export default function Contacts({setCurrentChat, loggedIn}) {
    const [contacts, setContacts] = useState([])

    const host = "https://prova-o218.onrender.com"

    useEffect(() => {
        loadContacts()
    }, [loggedIn])

    /*
    paths:
    api/friend/get
    /send_request
    /request_response
    /get_pending_requests
    */

    function selectChat(contact) {
        setCurrentChat(contact)
    }

    function loadContacts() {
        fetch(host + "/api/friend/get", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: localStorage.getItem("loggedUserName")})
        }).then(r => r.json()).then(table => {
            setContacts(table[0].friend_list.map(friend =>
                friend.friend_username
            ))
        })
            .catch(e => console.log(e))
    }

    return (
        <>
            <div id="contactsContainer">
                <h1>CONTATTI</h1>
                {contacts.map((contact, index) =>
                    <ContactsItem contact={contact} index={index} selectChat={selectChat}/>
                )}

            </div>
        </>
    )
}