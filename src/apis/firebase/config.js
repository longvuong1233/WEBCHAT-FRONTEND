import firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyBeyfzWGbPaWoZPPlcMCSGC3SC98vQo0iU",

  databaseURL: "https://chatapp-20537.firebaseio.com",
  projectId: "chatapp-20537",
  storageBucket: "chatapp-20537.appspot.com",
  messagingSenderId: "252820002322",
  appId: "1:252820002322:web:db1251bf57a77135286acb",
  measurementId: "G-2PDZ2VDTD9",
});

const fb = firebase.firestore();

export { fb, firebase };
