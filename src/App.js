import React from "react";
import "./App.css";
import firebase from "firebase/app";
import "firebase/firestore"; // Database integration
import "firebase/auth"; // Google authentication

// Hooks
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

// Initialize our Firebase project
firebase.initializeApp({});

// Global variable references
const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
    return (
        <div className="App">
            <header className="App-header"></header>
        </div>
    );
}

export default App;
