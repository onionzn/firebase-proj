import './App.css';
import { useState, createContext, useEffect } from 'react';
import { auth } from "./config/firebase";
import { onAuthStateChanged } from 'firebase/auth';
import TopNav from './Components/TopNav/TopNav';
//import LeftNav from './Components/LeftNav/LeftNav';
import RightNav from './Components/RightNav/RightNav'; 
import SignInOrUp from './Components/SignInOrUp/SignInOrUp';

export const TodoistContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log('User is signed in:', user.uid);
        setLoggedIn(true);
      } else {
        // No user is signed in
        console.log('No user is signed in');
        setLoggedIn(false);
      }
    });
    // Clean up the subscription when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className={"App"}>
      <div className={"main-container"}>
        <TopNav loggedIn={loggedIn}/>
        {loggedIn? <RightNav />: <SignInOrUp />}
      </div>
    </div>
  );
}

export default App;
