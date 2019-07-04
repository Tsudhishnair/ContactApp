import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBOvoI3-Ae7HzdpfX-7kwOQ5bxpHpGRbu8",
  authDomain: "contactsapp01.firebaseapp.com",
  databaseURL: "https://contactsapp01.firebaseio.com",
  projectId: "contactsapp01",
  storageBucket: "",
  messagingSenderId: "937998071410",
  appId: "1:937998071410:web:c1efdd29b6ca599a"
};

firebase.initializeApp(firebaseConfig);
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
