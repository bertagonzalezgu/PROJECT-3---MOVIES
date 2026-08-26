import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { signOut as firebaseSignOut } from "firebase/auth"
import { auth } from './firebaseConfig'

export async function signUp(email: string, password: string){
    await createUserWithEmailAndPassword(auth, email, password)
}

export async function signIn(email: string, password: string){
    await signInWithEmailAndPassword(auth, email, password)
}

export async function signOut(){
    await firebaseSignOut(auth)
}