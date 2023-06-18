import ChatMessagesListItems from "./ChatMessagesListItems";


export default function ChatMessages(loggedUser, currentChat) {
    const sendMessages = (e) => {
        e.preventDefault()
        let message = e.target.value;
        e.target.value="";
        console.log(message)
        fetch("http://localhost:3001/api/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({message, loggedUser, currentChat})
        }).then(r => r.json())
            .catch(e=>console.log(e))

    }

    return (
        <>
            <h1>CHAT</h1>
            <div><h1>{"da sostituire"}</h1></div>
            <ul style={{listStyle:"none"}}>
                <ChatMessagesListItems currentUser={loggedUser} currentChat={currentChat}/>
            </ul>
            <form onSubmit={sendMessages}>
                <input type="text" id="messageBox" placeholder="Invia messaggio...."/>
                <input type="submit" hidden/>
            </form>
        </>
    )
}