import React from "react";
import {faCheck, faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function FriendItem({friend_username, request_date, isRequester, index, sendResponse}) {
    return (
        <li key={index}>
            <h3>{friend_username}</h3>
            Data:{new Date(request_date).toLocaleString()}
            <p style={{color: isRequester ? 'red' : 'green'}}>
                {isRequester ? ' In attesa di risposta...' :
                    <>
                        <FontAwesomeIcon icon={faCheck} onClick={() => sendResponse(friend_username, true)}/>
                        <FontAwesomeIcon style={{marginLeft: '20px'}} icon={faXmark} onClick={() => sendResponse(friend_username, false)}/>
                    </>
                }
            </p>
        </li>
    )
}
