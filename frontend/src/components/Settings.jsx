
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export default function Settings({setLoggedIn}) {
    let navigate = useNavigate();
    const host = "https://prova-o218.onrender.com"

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
            }
        }).then(r => r.json()).then(log => {
            toast(log.message)
            logOut()
        })
        localStorage.clear()
        setLoggedIn(false)
    }


    return (
        <>
            <button onClick={purgeDatabase}>cancella database</button>

        </>
    )
}