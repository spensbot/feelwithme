import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/analytics'

var firebaseConfig = {
  apiKey: "AIzaSyBVaV85MY45A1RKEUWcbKiKrdBlsw94cpo",
  authDomain: "feelwithme-a2e32.firebaseapp.com",
  databaseURL: "https://feelwithme-a2e32.firebaseio.com",
  projectId: "feelwithme-a2e32",
  storageBucket: "feelwithme-a2e32.appspot.com",
  messagingSenderId: "162376611349",
  appId: "1:162376611349:web:ac480a9594b336c205801c",
  measurementId: "G-4RF3E2N6GQ"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

var storageRef = firebase.storage().ref()

export default storageRef