import firebase from 'firebase';


var firebaseConfig = {
  apiKey: "AIzaSyDqAduBE0OfWKY9X-LqL86lI9rLHOOGBrg",
  authDomain: "filebyrd.com",
  databaseURL: "https://dashbrd-152dc.firebaseio.com",
  projectId: "dashbrd-152dc",
  storageBucket: "dashbrd-152dc.appspot.com",
  messagingSenderId: "290858058295",
  appId: "1:290858058295:web:f33fe582f2f4b1a15cb5b2",
  measurementId: "G-ZN9FQBRY7S"
};


var dev_firebaseConfig = {
  apiKey: "AIzaSyByCXJNCJZpPLierW9bh5-gXl2AcfQ07uc",
  authDomain: "devfilebyrd-2dfc.firebaseapp.com",
  databaseURL: "https://devfilebyrd-2dfc.firebaseio.com",
  projectId: "devfilebyrd-2dfc",
  storageBucket: "devfilebyrd-2dfc.appspot.com",
  messagingSenderId: "582615589767",
  appId: "1:582615589767:web:6329cec3ad2a11e3a6e922",
  measurementId: "G-48F43Q333Z"
};

const config = process.env.NODE_ENV === "production" ? firebaseConfig : dev_firebaseConfig;
debugger;
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

firebase.analytics();
const fdb = firebase.database();
const fstorage = firebase.storage();

const fauth = new firebase.auth();
const auth = firebase.auth;
const messaging = firebase.messaging();

export { firebase, fdb, fstorage, fauth, auth, messaging };