import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { signOut as firebaseSignOut } from "firebase/auth"
import { auth } from './firebaseConfig'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"

const googleProvider = new GoogleAuthProvider()

export async function signUp(email: string, password: string){
    await createUserWithEmailAndPassword(auth, email, password)
}

export async function signIn(email: string, password: string){
    await signInWithEmailAndPassword(auth, email, password)
}

export async function signOut(){
    await firebaseSignOut(auth)
}

export async function loginWithGoogle(){
  try{
    const result = await signInWithPopup(auth, googleProvider)
    return result.user
  } catch(error){
    console.error("Error al iniciar sesión con Google:", error)
    throw error
  }
}