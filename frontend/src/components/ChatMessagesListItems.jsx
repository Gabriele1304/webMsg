export default function ChatMessagesListItems({username, message, date}) {

    return (
        <div>
            <h1>{username}</h1>
            <p>{message}<br/>{date}</p>
        </div>
    )
}