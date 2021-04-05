import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../App";
import googleIcon from "../../images/googleicon.png"
import './Login.css'

if(!firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [user, setUser] = useState({
    isLogin: false,
    name: "",
    email: "",
    password: "",
    error: "",
    emailError: "",
    passwordError: "",
    success: false,
  });

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if(redirect) {

    }
  }

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const googleLogIn = () => {
    firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then((res) => {
      const {displayName, email} = res.user;
      const userInfo ={
          isLogin: true,
          name: displayName,
          email: email
      }
      handleResponse(userInfo, true);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
        <div className="tempo">
            <button className="signIn-btn btn btn-secondary" onClick={googleLogIn}><img src={googleIcon} alt=""/>continue with google</button>
        </div>
  ); 
};

export default Login;
