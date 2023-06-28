import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App'

// import '../src/back_end/index'

import './index.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDCgL3BezqLolQMZeaadYNA-V2JbtlsTaM",
    authDomain: "messages-49732.firebaseapp.com",
    projectId: "messages-49732",
    storageBucket: "messages-49732.appspot.com",
    messagingSenderId: "656243655613",
    appId: "1:656243655613:web:e0211ffe6d02730d1688d4",
    measurementId: "G-6TV13PX8YT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
)