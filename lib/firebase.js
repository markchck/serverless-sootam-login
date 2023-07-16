// Import the functions you need from the SDKs you need
import { async } from "@firebase/util"
import { initializeApp } from "firebase/app"
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth"

// Firebase config
const firebaseConfig = {
  apiKey: `${process.env.FIREBASE_API_KEY}`,
  authDomain: `${process.env.FIREBASE_AUTH_DOMAIN}`,
  projectId: `${process.env.PROJECT_ID}`,
  storageBucket: `${process.env.STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.MESSAGING_SENDER_ID}`,
  appId: `${process.env.APP_ID}`,
  measurementId: `${process.env.MEASUREMENT_ID}`,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth()
const provider = new GoogleAuthProvider()
auth.languageCode = "ko"

export const register = async (userEmail, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userEmail,
      password
    )
    const user = JSON.stringify(userCredential.user)
    return user
  } catch (error) {
    console.error(error)
  }
}

export const login = async (userEmail, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      userEmail,
      password
    )
    const user = JSON.stringify(userCredential.user)
    return user
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const socialLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider)
    const credential = GoogleAuthProvider.credentialFromResult(result)
    const token = credential.accessToken
    const user = result.user
    return { user: user, token: token }
  } catch (error) {
    console.error(error)

    // // The AuthCredential type that was used.
    // const email = error.customData.email
    // const credential = GoogleAuthProvider.credentialFromError(error)
  }
}
