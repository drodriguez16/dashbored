import firebase from 'firebase';


var firebaseConfig = {
    apiKey: `AIzaSyDqAduBE0OfWKY9X-LqL86lI9rLHOOGBrg`,
    authDomain: `dashbrd-152dc.firebaseapp.com`,
    databaseURL: "https://dashbrd-152dc.firebaseio.com",
    projectId: "dashbrd-152dc",
    storageBucket: "dashbrd-152dc.appspot.com",
    messagingSenderId: "290858058295",
    appId: "1:290858058295:web:f33fe582f2f4b1a15cb5b2",
    measurementId: "G-ZN9FQBRY7S"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  const fdb = firebase.database();
  const fstorage = firebase.storage();

  const fauth =new firebase.auth();
  const auth =firebase.auth;

export {firebase,fdb, fstorage, fauth, auth};