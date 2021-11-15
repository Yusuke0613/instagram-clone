import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

export const firebaseConfig = {
	apiKey: "AIzaSyD0s19L1Cyp7v9snWhSoA-LCkTu3Na6-ik",
	authDomain: "instagram-clone-485bc.firebaseapp.com",
	projectId: "instagram-clone-485bc",
	storageBucket: "instagram-clone-485bc.appspot.com",
	messagingSenderId: "174286341025",
	appId: "1:174286341025:web:0bc3bce8c4888c54cd41e0",
	measurementId: "G-KCLRTKLWS0",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebaseApp.auth();
export const db = firebaseApp.firestore();
export const storage = firebaseApp.storage();
export const provider = new firebase.auth.GoogleAuthProvider();
export const session = firebase.auth.Auth.Persistence.SESSION;
