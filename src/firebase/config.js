import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA_uAER7a-8xgtf4SfXSHSu-n99JT7knmA",
  authDomain: "financeapp-b1301.firebaseapp.com",
  projectId: "financeapp-b1301",
  storageBucket: "financeapp-b1301.appspot.com",
  messagingSenderId: "381710431502",
  appId: "1:381710431502:web:a4cbd1fb080af15d53535f",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

export { projectFirestore, projectAuth };
