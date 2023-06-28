export default function ChatMessagesListItems({username, message, date}) {

    return (
        <div>
            <p>{username}: {message}
                <br/>{date}</p>
        </div>
    )
}