import { useState } from "react";
import AuthContext from "./AuthContext";
import app from "../../firebase/firebase.config";
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth'
import { useEffect } from "react";
import { GoogleAuthProvider } from "firebase/auth";
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)  
  const [loading, setLoading] = useState(true)  
  
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }
  
  const signUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
  }


  const logOut = () => {
    setLoading(true);
    return signOut(auth)
  }

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, provider)
  }

  const authInfo = {
    user,
    loading,
    setUser,
    createUser,
    signUser,
    logOut,
    googleLogin
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
        setLoading(false);
    })

    return () => unsubscribe()
  })

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
