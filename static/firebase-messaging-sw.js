// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.8.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
    messagingSenderId: "578965347128",

    apiKey: "AIzaSyCPQnZDtxSkDo3xrfoRLaeqLHUsbzN3d6M",
    authDomain: "suzuki-prototype-service.firebaseapp.com",
    databaseURL: "https://suzuki-prototype-service.firebaseio.com",
    projectId: "suzuki-prototype-service" || publicRuntimeConfig.FIREBASE_PROJECT_ID,
    appId: "1:578965347128:web:e1749aea2086d7e629bfcd"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();