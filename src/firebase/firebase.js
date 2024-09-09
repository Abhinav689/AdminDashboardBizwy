import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCHXA6SuXpAICZOC6Ypa_fsE0Vxx7M_nWU",
  authDomain: "otps-57baa.firebaseapp.com",
  projectId: "otps-57baa",
  storageBucket: "otps-57baa.appspot.com",
  messagingSenderId: "1066191355220",
  appId: "1:1066191355220:web:34265865eb4e06f36bdcc1",
  measurementId: "G-91G35D6NY7"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)


export { app,auth };
