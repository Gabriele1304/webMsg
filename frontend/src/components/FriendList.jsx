import React, {useEffect, useState} from 'react';
import FriendItem from "./FriendItem";
import {toast} from "react-toastify";

export default function FriendList({username}) {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [newRequest, setNewRequest] = useState('');
    const host = "https://prova-o218.onrender.com"

    const sendRequest = async () => {
        let response = await fetch(host + "/api/friend/send_request", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username, friend_username: newRequest.toString()})
        })
        response = await response.json()
        toast(response.message)
        setPendingRequests("")
        getPendingRequests()

        setNewRequest('')
    };

    const sendResponse = (friend_username, response) => {
        //send response
        console.log(response)
        console.log(friend_username)

        fetch(host + "/api/friend/request_response", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                friend_username: friend_username,
                accept_status: response
            })
        }).then(r => r.json()).then(r => {
            toast(r.message)
            setPendingRequests("")
            getPendingRequests()
        })
            .catch(e => console.log(e))


    }

    const getPendingRequests = () => {
        fetch(host + '/api/friend/get_pending_requests', {
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
