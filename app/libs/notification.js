/* eslint-disable no-undef */
import firebase from 'firebase';
import axios from 'axios';
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export const initNotificationSW = async () => {
  try {
    const result = await Notification.requestPermission()
    if (result === 'default' || result == 'denied') {
      return
    }
    if (!firebase.apps.length) {
      console.log("INIT FIREBASE")
      // firebase.initializeApp({
      //   apiKey: "AIzaSyCtznwW_414RfWqgVKwbx51_UZ2UHHqV6E",
      //   authDomain: "pwa-auto-value.firebaseapp.com",
      //   databaseURL: "https://pwa-auto-value.firebaseio.com",
      //   projectId: "pwa-auto-value",
      //   messagingSenderId: "182698249088",
      //   appId: "1:182698249088:web:be96def95e988f4d"
      // })
      firebase.initializeApp({
        apiKey: publicRuntimeConfig.FIREBASE_API_KEY,
        authDomain: publicRuntimeConfig.FIREBASE_AUTH_DOMAIN,
        databaseURL: publicRuntimeConfig.FIREBASE_DATABASE_URL,
        projectId: "suzuki-prototype-service" || publicRuntimeConfig.FIREBASE_PROJECT_ID,
        messagingSenderId: publicRuntimeConfig.FIREBASE_MESSAGING_SENDER_ID,
        appId: publicRuntimeConfig.FIREBASE_APP_ID
      })
    }

    console.log('firebase initialized');

    if ('serviceWorker' in navigator) {
      // register a new service worker
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log('registration : ', registration);
      const messaging = firebase.messaging()

      // getting fcm token
      const token = await messaging.getToken()
      console.log('firebase token : ', token);

      localStorage.setItem('FCM_TOKEN', token)

      // handle refresh token
      messaging.onTokenRefresh(() => {
        messaging.getToken().then((token) => {
          localStorage.setItem('FCM_TOKEN', token);
          console.log('fcm token : ', token);
          // const userId = localStorage.getItem('USER_ID')
          return axios.post(`${publicRuntimeConfig.API_URL}/notification/add`, { topic: 'cars', token })
        }).catch(console.log)
      })

      // on received notification
      messaging.onMessage((payload) => {
        console.log('message : ', payload);
        const title = payload.notification.title;
        const options = {
            body: payload.notification.body,
            icon: payload.notification.icon,
            action: [{
              action: payload.notification.link || 'https://autovalue.co.id',
              title: 'Open'
            }]
        };
        registration.showNotification(title, options);           
      });

      // send fcm token to backend
      // const userId = localStorage.getItem('USER_ID')
      await axios.post(`${publicRuntimeConfig.API_URL}/notification/add`, { topic: 'cars', token })
        .then((resp) => {
          console.log(resp)
        })
        .catch((e) => console.log(`Error ${e}`))
      console.log('onstart : ', token);
    }
    console.log('firebase step 2')
  } catch (err) {
    alert(`Error ${err}`)
  }
}

export const unregNotificationSW = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for(let registration of registrations) registration.unregister();
    });
  }
}
