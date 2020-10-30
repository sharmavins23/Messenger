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
    return (
        <div className="App">
            <header className="App-header"></header>
        </div>
    );
}

export default App;
