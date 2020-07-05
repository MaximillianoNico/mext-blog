// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-messaging.js');
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
    messagingSenderId: "182698249088",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  new workbox.strategies.CacheFirst({
    cacheName: '@autovalue:image',
    plugins: [new workbox.expiration.Plugin({ maxEntries: 60, maxAgeSeconds: 30 * 24 * 3600 })],
  }),
);

workbox.routing.registerRoute(
  /\.(?:js|html|css)$/,
  new workbox.strategies.NetworkFirst({
    cacheName: '@autovalue:code',
    plugins: [new workbox.expiration.Plugin({ maxEntries: 60, maxAgeSeconds: 30 * 24 * 3600 })],
  }),
);

workbox.routing.registerRoute(
  '/',
  new workbox.strategies.NetworkFirst({
    cacheName: '@autovalue:root',
    plugins: [new workbox.expiration.Plugin({ maxEntries: 60, maxAgeSeconds: 30 * 24 * 3600 })],
  }),
);

// Cache the Google Fonts webfont files with a cache first strategy for 1 year.
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: '@autovalue:google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({ statuses: [0, 200], }),
      new workbox.expiration.Plugin({ maxAgeSeconds: 60 * 60 * 24 * 365, }),
    ],
  }),
);