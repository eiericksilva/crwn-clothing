//Conexão com o Firebase
import { initializeApp } from "firebase/app";
//Autenticação do Firebase
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
 

const firebaseConfig = {
    apiKey: "AIzaSyA45AoVtNQPuz7Jj9WTmpo-oiwsIUO1z6o",
    authDomain: "crwn-clothing-db-31041.firebaseapp.com",
    projectId: "crwn-clothing-db-31041",
    storageBucket: "crwn-clothing-db-31041.appspot.com",
    messagingSenderId: "59612222565",
    appId: "1:59612222565:web:ccec2643b94a587374228c"
  };
  

const firebaseApp = initializeApp(firebaseConfig);


const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account',
})

export const auth = getAuth()
export const db = getFirestore()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const createUserDocumentFromAuth = async (userAuth) => {
  
  //Criando uma referência ao document 
  const userDocRef = doc(db, 'users', userAuth.uid )
  console.log(userDocRef)

  //lendo dados 
  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot)
  console.log(userSnapshot.exists())

  //caso a referência do Usuário não exista
  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, { displayName, email, createdAt })
    } catch(error) {
      console.log('🔥 error creating the user', error.message)
    }
  }
  return userDocRef;
}