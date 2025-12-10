import { useState } from "react";
import AuthContext from "./AuthContext";
import app from "../../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect } from "react";
import { GoogleAuthProvider } from "firebase/auth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo
    })
  }

  const signUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const authInfo = {
    user,
    loading,
    setUser,
    createUser,
    signUser,
    logOut,
    googleLogin,
    updateUser,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          const user = { email: currentUser?.email };
          const { data } = await axiosPublic.post("/jwt", user);
          if (data?.token) {
            localStorage.setItem("token", data?.token);
          } else {
            setUser(null);
            localStorage.removeItem("token");
          }
        } else {
          setUser(null);
          localStorage.removeItem("token");
        }
        setUser(currentUser);
        setLoading(false)
      } catch (err) {
        console.log(err);
        setUser(null)
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  });

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
