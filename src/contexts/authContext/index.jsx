import React, { useContext, useState, useEffect, createContext } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, initializeUser);

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  async function initializeUser(user) {
    if (user) {
      setCurrentUser({ ...user });

      // Extract and set username
      const displayName = user.displayName || '';
      setUsername(displayName);

      // Check if the user signed in using email and password
      const isEmail = user.providerData.some(
        (provider) => provider.providerId === "password"
      );
      setIsEmailUser(isEmail);

      // Check if the user signed in using Google
      const isGoogle = user.providerData.some(
        (provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID
      );
      setIsGoogleUser(isGoogle);

      setUserLoggedIn(true);
    } else {
      // Reset state if user is not logged in
      setCurrentUser(null);
      setUserLoggedIn(false);
      setUsername('');
    }

    // Set loading to false once user initialization is complete
    setLoading(false);
  }

  // Define the context value
  const value = {
    userLoggedIn,
    isEmailUser,
    isGoogleUser,
    currentUser,
    username,
    setCurrentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
