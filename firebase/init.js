// Import the functions you need from the SDKs you need
const  { initializeApp } = require("firebase/app");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCh8NAAcvMAoBRhEQWYZHxWZm7w36CmVQs",
  authDomain: "crypto-wallets-92a18.firebaseapp.com",
  projectId: "crypto-wallets-92a18",
  storageBucket: "crypto-wallets-92a18.appspot.com",
  messagingSenderId: "216168521097",
  appId: "1:216168521097:web:c9c2471ffe150bdb621558",
  measurementId: "G-7WZ5P63D3K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
module.exports = app