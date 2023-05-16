import "../../App.css";
import "./SignInOrUp.css";
import { auth, googleProvider } from "../../config/firebase";
import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

function SignInOrUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState('');
    const [showSignUp, setShowSignUp] = useState(false);

    const handleSignIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSignInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err);
        }
    }

    const handleSignUp = async () => {
        try {
            if (password !== confirmPassword) {
                setError('Passwords do not match!');
                return;
            }
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
        }
    }

    const handleSwitching = () => {
        setShowSignUp(!showSignUp);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };


    if (showSignUp) {
        return (
            <div className={"inner-container"}>
                <h2>Sign Up</h2>
                {error && <div>{error}</div>}
                <div className={"sign-in-input-container"}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" onChange={handleEmailChange}/>
                </div>
                <div className={"sign-in-input-container"}>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" onChange={handlePasswordChange}/>
                </div>
                <div className={"sign-in-input-container"}>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" id="confirmPassword" onChange={handleConfirmPasswordChange}/>
                </div>

                <div className={"sign-in-buttons-container"}>
                    <button onClick={handleSignUp}> Sign Up </button>
                    <button onClick={handleSwitching}> Returning User Sign In </button>
                </div>
            </div>
        );
    }

    return (
        <div className={"inner-container"}>
            <p>Please sign in to view or update your todo list.</p>
            <h2>Sign In</h2>
            <div className={"sign-in-input-container"}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" onChange={handleEmailChange}/>
            </div>

            <div className={"sign-in-input-container"}>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" onChange={handlePasswordChange}/>
            </div>

            <div className={"sign-in-buttons-container"}>
                <button onClick={handleSignIn}>Sign In</button>
                <button onClick={handleSignInWithGoogle}> Sign In With Google</button>
                <button onClick={handleSwitching}> New User Sign Up</button>
            </div>
        </div>
    );
}

export default SignInOrUp;