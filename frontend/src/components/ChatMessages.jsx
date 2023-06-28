import ChatMessagesListItems from "./ChatMessagesListItems";
import {useEffect, useState} from "react";


export default function ChatMessages({currentChat, loggedUser: {username}}) {
    const [chatMessages, setChatMessages] = useState([])

    const sendMessage = (e) => {
        e.preventDefault()
        let message = e.target.chatBox.value;
        e.target.chatBox.value = "";
        console.log(message)
        fetch("http://localhost:3001/api/messages/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message,
                username: username,
                friend_username: currentChat
            })
        }).then(r => r.json()).then(log => console.log(log)).finally(()=>getMessages())
            .catch(e => console.log(e))

    }

    const getMessages = () => {
        if (currentChat == null) return
        console.log("getting messages from " + currentChat)
        fetch("http://localhost:3001/api/messages/receive", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                friend_username: currentChat
            })
        }).then(r => r.json()).then(messages => {
            console.log(messages)
            setChatMessages([...chatMessages, messages])
        })
            .catch(e => console.log(e))
    }

    useEffect(() => {
        getMessages()
    }, [currentChat])
    return (
        <>
            {
                currentChat != null ?
                    <>
                        <div style={{height: "10%"}}>
                            <h1>{currentChat}</h1>
                        </div>
                        <div style={{height: "80%"}}>
                            <ul style={{listStyle: "none"}}>
                                {
                                    chatMessages.length > 0 ?
                                        chatMessages[0].map((message, index) => {
                                            return <ChatMessagesListItems date={message.date} message={message.message}
                                                                          username={message.sender}/>
                                        })
                                        :
                                        null
                                }
                            </ul>
                        </div>
                        <div style={{height: "10%"}}>
                            <form onSubmit={e => sendMessage(e)}>
                                <input type="text" name="chatBox" placeholder="Invia messaggio...."/>
                                <input type="submit" hidden/>
                            </form>
                        </div>
                    </> : null
            }


        </>
    )
}