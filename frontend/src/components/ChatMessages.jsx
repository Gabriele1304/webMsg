import ChatMessagesListItems from "./ChatMessagesListItems";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";


export default function ChatMessages({currentChat, loggedUser: {username}}) {
    const [chatMessages, setChatMessages] = useState([])
    const navigate=useNavigate()

    const host ="http://localhost:3001"

    const sendMessage = (e) => {
        e.preventDefault()
        let message = e.target.chatBox.value;
        e.target.chatBox.value = "";
        fetch(host+"/api/messages/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message,
                username: username,
                friend_username: currentChat
            })
        }).finally(()=>getMessages())
            .catch(e => console.log(e))

    }

    const getMessages = () => {
        if (currentChat == null) return
        console.log("getting messages from " + currentChat)
        fetch(host+"/api/messages/receive", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                friend_username: currentChat
            })
        }).then(r => r.json()).then(messages => {
            setChatMessages(messages)
        })
            .catch(e => console.log(e))
    }

    const removeFriend = () => {
        fetch(host +"/api/friend/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username, friend_username: currentChat})
        }).then(r => r.json()).then(log => {
            toast(log.message)
            navigate("/")
        })
    }

    useEffect(() => {
        getMessages()
    }, [currentChat])
    return (
        <>
            {
                currentChat != null ?
                    <>
                        <div style={{height: "10%",display: "flex"}}>
                            <h1>{currentChat}</h1>
                            <button style={{position: "absolute", right: "10px"}} onClick={() => removeFriend()}>remove friend</button>
                        </div>
                        <div style={{height: "80%"}}>
                            <ul style={{listStyle: "none"}}>
                                {
                                    chatMessages.length > 0 ?
                                        chatMessages.map((message, index) => {
                                            return <ChatMessagesListItems date={message.date} message={message.message}
                                                                          username={message.sender}/>
                                        })
                                        :
                                        null
                                }
                            </ul>
                        </div>
                        <div style={{ display: "flex",position: "relative", bottom: "10px"}}>
                            <form onSubmit={e => sendMessage(e)}>
                                <input type="text" name="chatBox" placeholder="Invia messaggio...."/>
                                <input type="submit" hidden/>
                            </form>
                            <button onClick={() => getMessages()}>ReloadChat</button>
                        </div>
                    </> : null
            }


        </>
    )
}