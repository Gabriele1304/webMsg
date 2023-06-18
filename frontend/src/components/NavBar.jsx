export default function NavBar({logOut}) {

    return (
        <>
            <div style={{margin:"20px"}}>
                <h1>NAVBAR</h1>
                <form onSubmit={logOut}>
                    <input type="submit" value="log out"/>
                </form>
            </div>
        </>
    )
}