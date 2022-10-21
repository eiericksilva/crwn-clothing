//Conexão com o Firebase
import { initializeApp } from "firebase/app";
//Autenticação do Firebase
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyA45AoVtNQPuz7Jj9WTmpo-oiwsIUO1z6o",
    authDomain: "crwn-clothing-db-31041.firebaseapp.com",
    projectId: "crwn-clothing-db-31041",
    storageBucket: "crwn-clothing-db-31041.appspot.com",
    messagingSenderId: "59612222565",
    appId: "1:59612222565:web:ccec2643b94a587374228c"
  };
  

const firebaseApp = initializeApp(firebaseConfig);


const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account',
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)