import './TopNav.css';
import '../../App.css';
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";

function TopNav({ loggedIn }) {    
    
    const logOut = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className={"top-nav"}>
            <h1>Todo List</h1>
            {loggedIn? <p className={"log-out-button"} onClick={logOut}>Sign Out</p> : null}
        </div>
    );
}

export default TopNav;