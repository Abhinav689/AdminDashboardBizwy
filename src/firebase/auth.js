// authService.js or similar file
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

// Create a user with email and password
export const doCreateUserWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    console.error("Error creating user with email and password:", error);
    throw error; // Re-throw to handle in calling code
  }
};

// Sign in with email and password
export const doSignInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    console.error("Error signing in with email and password:", error);
    throw error;
  }
};

// Sign in with Google
export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Optional: add user to Firestore or other operations
    return user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

// Sign out
export const doSignOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// Password reset
export const doPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
};

// Password change
export const doPasswordChange = async (password) => {
  if (!auth.currentUser) {
    throw new Error("No user is currently signed in.");
  }
  try {
    await updatePassword(auth.currentUser, password);
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};

// Send email verification
export const doSendEmailVerification = async () => {
  if (!auth.currentUser) {
    throw new Error("No user is currently signed in.");
  }
  try {
    await sendEmailVerification(auth.currentUser, {
      url: `${window.location.origin}/home`,
    });
  } catch (error) {
    console.error("Error sending email verification:", error);
    throw error;
  }
};
