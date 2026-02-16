 importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAncPiVkooaiF1fd7qG416O1EY2zimKaQU",
  authDomain: "practice-notify.firebaseapp.com",
  projectId: "practice-notify",
  storageBucket: "practice-notify.firebasestorage.app",
  messagingSenderId: "22965726587",
  appId: "1:22965726587:web:f56ba31ac0911c175661de",
  measurementId: "G-SVY74PQ0P3"
});

const messaging = firebase.messaging();