import React from "react";
import "./App.css";
import firebase from "firebase/app";
import "firebase/firestore"; // Database integration
import "firebase/auth"; // Google authentication
require("dotenv").config();

// Hooks
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

// Initialize our Firebase project
firebase.initializeApp({
    apiKey: process.env.APIKEY,
    authDomain: "messenger-sharmavins23.firebaseapp.com",
    databaseURL: "https://messenger-sharmavins23.firebaseio.com",
    projectId: "messenger-sharmavins23",
    storageBucket: "messenger-sharmavins23.appspot.com",
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
});

// Global variable references
const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
    const [user] = useAuthState(auth);

    return (
        <div className="App">
            <header className="App-header"></header>

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

    const [messages] = useCollectionData(query, { idField: "id" }); // Returns 25 data objects

    return (
        <div>
            {messages &&
                messages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} />
                ))}
        </div>
    );
}

// Child component for chatroom
function ChatMessage(props) {
    const { text, uid } = props.message;
    return <p>{text}</p>;
}

export default App;
