import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome,faCog, faSignOutAlt, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from "react-router-dom";

export default function Settings({setLoggedIn}) {
    let navigate = useNavigate();

    function logOut() {
        setLoggedIn(false)
        localStorage.clear()
        navigate("/")
    }

    function purgeDatabase() {
        fetch(host+"/api/purge", {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: localStorage.getItem("loggedUserName"), friend_username: localStorage.getItem("loggedUserPassword")})
        }).then(r => r.json()).then(log => {
            toast(log.message)
            localStorage.clear()
            setLoggedIn(false)
        })
    }


    return (
        <>
            <button onClick={purgeDatabase}>cancella database</button>

        </>
    )
}