import dotenv from "dotenv"
dotenv.config()
import { initializeApp } from "firebase/app"
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth"
import CryptoJS from "crypto-js"

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
    const decryptedPassword = CryptoJS.AES.decrypt(
      password,
      `${process.env.CRYPTO_KEY}`
    ).toString(CryptoJS.enc.Utf8)

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userEmail,
      decryptedPassword
    )
    const user = JSON.stringify(userCredential.user)
    return user
  } catch (error) {
    throw new Error("회원가입 실패" + error)
  }
}

export const login = async (userEmail, password) => {
  try {
    const decryptedPassword = CryptoJS.AES.decrypt(
      password,
      `${process.env.CRYPTO_KEY}`
    ).toString(CryptoJS.enc.Utf8)

    const userCredential = await signInWithEmailAndPassword(
      auth,
      userEmail,
      decryptedPassword
    )
    const user = JSON.stringify(userCredential.user)
    return user
  } catch (error) {
    console.error(error)
    throw error
  }
}
