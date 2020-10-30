import React, { useState, useRef } from "react";
import "./App.css";

import firebase from "firebase/app";
import "firebase/firestore"; // Database integration
import "firebase/auth"; // Google authentication
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const vars = require("./hiddenVars.json");

// Initialize our Firebase project
firebase.initializeApp({
    apiKey: vars.apiKey,
    authDomain: vars.authDomain,
    databaseURL: vars.databaseURL,
    projectId: vars.projectId,
    storageBucket: vars.storageBucket,
    messagingSenderId: vars.messagingSenderId,
    appId: vars.appId,
});

// Global variable references
const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
    const [user] = useAuthState(auth);

    return (
        <div className="App">
            <header>
                <h1>Messenger</h1>
                <SignOut />
            </header>

            <section>{user ? <ChatRoom /> : <SignIn />}</section>
        </div>
    );
}

function SignIn() {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    };

    return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}

function SignOut() {
    return (
        auth.currentUser && (
            <button className="sign-out" onClick={() => auth.signOut()}>
                Sign Out
            </button>
        )
    );
}

function ChatRoom() {
    const messagesRef = firestore.collection("messages"); // Reference to messages data
    const query = messagesRef.orderBy("createdAt").limit(25);

    // States
    const [messages] = useCollectionData(query, { idField: "id" }); // Returns 25 data objects
    const [formValue, setFormValue] = useState("");

    const dummy = useRef();
    const sendMessage = async (e) => {
        e.preventDefault(); // Don't refresh page after form submit

        const { uid, photoURL } = auth.currentUser;

        await messagesRef.add({
            // Write new document in Firestore
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL,
        });

        setFormValue(""); // Reset form value
        dummy.current.scrollIntoView({ behavior: "smooth" }); // Scroll to bottom of msgs
    };

    return (
        <>
            {/* Messages display */}
            <main>
                {messages &&
                    messages.map((msg) => (
                        <ChatMessage key={msg.id} message={msg} />
                    ))}

                {/* Dummy div to refocus with message send */}
                <span ref={dummy}></span>
            </main>
            {/* Message form */}
            <form onSubmit={sendMessage}>
                <input
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                    placeholder="Send a message..."
                />
                <button type="submit" disabled={!formValue}>
                    🚀
                </button>
            </form>
        </>
    );
}

// Child component for chatroom
function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;

    const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

    return (
        <div className={`message ${messageClass}`}>
            <img src={photoURL} />
            <p>{text}</p>
        </div>
    );
}

export default App;
