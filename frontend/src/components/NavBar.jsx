import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome,faCog, faSignOutAlt, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from "react-router-dom";

export default function NavBar({setLoggedIn}) {
    let navigate = useNavigate();

    function logOut() {
        setLoggedIn(false)
        localStorage.clear()
        navigate("/")
    }

    return (
        <>
                <ul style={{display: "flex", listStyleType: "none"}}>
                    <li>
                        <label onClick={()=>navigate("/")}>
                            <FontAwesomeIcon icon={faHome}/>
                            Home
                        </label>
                    </li>
                    <li>
                        <label onClick={()=>navigate("/contactsRequests")}>
                            <FontAwesomeIcon icon={faUserPlus}/>
                            Contacts
                        </label>
                    </li>
                    <li>
                        <label onClick={()=>navigate("/settings")}>
                            <FontAwesomeIcon icon={faCog}/>
                            Settings
                        </label>
                    </li>
                    <li>
                        <label onClick={logOut}>
                            <FontAwesomeIcon icon={faSignOutAlt}/>
                            Logout
                        </label>
                    </li>
                </ul>
        </>
    )
}