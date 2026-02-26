importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js");

firebase.initializeApp({
     apiKey: "AIzaSyCyT2qcj1j05PXgVgZnwNkKto_FgAR1VFQ",
  authDomain: "test-notification-e6d9a.firebaseapp.com",
  projectId: "test-notification-e6d9a",
  storageBucket: "test-notification-e6d9a.firebasestorage.app",
  messagingSenderId: "352033078609",
  appId: "1:352033078609:web:f023d814431a2afac66770",
  measurementId: "G-ZVX9TXT5R5"
})

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
  });
})