import React, {useEffect, useState} from 'react';
import FriendItem from "./FriendItem";

export default function FriendList({username}) {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [newRequest, setNewRequest] = useState('');

    const sendRequest = async () => {
        if (newRequest.trim() !== '') {
            let response = await fetch("http://localhost:3001/api/friend/send_request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username: username, friend_username: newRequest.toString()})
            })
            response = await response.json()
            if (response.refresh) {
                getPendingRequests()
            }
            setNewRequest('')
        }
    };

    const sendResponse = (friend_username, response) => {
        //send response
        console.log(response)
        console.log(friend_username)

        fetch("http://localhost:3001/api/friend/request_response", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                friend_username: friend_username,
                accept_status: response
            })
        }).then(r => r.json()).then(log => console.log(log))
            .finally(() => getPendingRequests())
            .catch(e => console.log(e))


    }

    const getPendingRequests = () => {
        fetch('http://localhost:3001/api/friend/get_pending_requests', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username})
        }).then(r => r.json()).then(table => {
            if (table.error != null) {
                console.log(table.error)
                return
            }
            let req = table[0].friend_requests.map(friend => friend)
            setPendingRequests(req)
            console.log("richieste ricevute:")
            console.log(req)
        }).catch(e => console.log(e))
    }

    useEffect(() => {
        getPendingRequests()
    }, [])

    return (
        <div>
            <h3>Richieste ricevute</h3>
            {pendingRequests.length === 0 ? (
                <p>0 Richieste in attesa</p>
            ) : (
                <ul>
                    {pendingRequests.map((request, index) => (
                        <FriendItem friend_username={request.friend_username} request_date={request.request_date}
                                    isRequester={request.isRequester} index={index} sendResponse={sendResponse}/>
                    ))}
                </ul>
            )}

            <h3>Invia nuove richieste</h3>
            <input
                type="text"
                value={newRequest}
                onChange={e => setNewRequest(e.target.value)}
                placeholder="Inserire username amico"
            />
            <button onClick={sendRequest}>Send Request</button>
        </div>
    );
}
