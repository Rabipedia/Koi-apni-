import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../App";
import googleIcon from "../../images/googleicon.png";
import "./Login.css";
import { Link, useHistory, useLocation } from "react-router-dom";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [newUser, setNewUser] = useState(false);
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

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || {from: {pathname: "/"}};

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
        history.replace(from);
    }
  };

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const googleLogIn = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((res) => {
        const { displayName, email } = res.user;
        const userInfo = {
          isLogin: true,
          name: displayName,
          email: email,
        }
        handleResponse(userInfo, true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBlur = (event) => {
    let isFormValid = true;
    let password;
    let confirmPassword;
    if (event.target.name === "email") {
      isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
      if (isFormValid === false) {
        user.emailError = "Enter valid email";
        setUser(user);
      }
    }
    if (event.target.name === "password") {
      isFormValid = event.target.value > 6;
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFormValid = isPasswordValid && passwordHasNumber;
      if (isFormValid === false) {
        user.passwordError = "Your password is not strong enough";
        setUser(user);
      } else {
        password = event.target.value;
      }
    }
    if (event.target.name === "confirmpassword") {
      confirmPassword = event.target.value;
    }
    if (password !== confirmPassword) {
      user.passwordError = `Your password didn't match.`;
      setUser(user);
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  };

  const handleSubmit = (event) => {
    if (newUser && user.emailError && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          handleResponse(newUserInfo, true);
          updateNewUserName(user.name);
        })
        .catch((err) => {
          console.log(err);
          const newUserInfo = { ...user };
          newUserInfo.error = err.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.name = res.user.displayName;
          newUserInfo.isLogin = true;
          newUserInfo.success = true;
          handleResponse(newUserInfo, true);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
          console.log(error.message);
        });
    }
    event.preventDefault();
  };
  const updateNewUserName = (name) => {
    const user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name,
      })
      .then(() => {
        console.log("user name updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="mt-5 user-form">
        <div className="form-box">
          <form onSubmit={handleSubmit}>
            {newUser && (
              <input
                className="form-control mb-2"
                name="name"
                type="text"
                onBlur={handleBlur}
                placeholder="Your full name"
                required
              />
            )}

            <input
              className="form-control mb-2"
              type="email"
              name="email"
              onBlur={handleBlur}
              placeholder="Enter Your Email "
              required
            />
            <input
              className="form-control mb-2"
              type="password"
              name="password"
              onBlur={handleBlur}
              placeholder="Enter Your Password"
              required
            />
            {newUser && (
              <input
                className="form-control mb-2"
                name="confirmPassword"
                type="password"
                onBlur={handleBlur}
                placeholder="Confirm password"
                required
              />
            )}
            {user.passwordError && (
              <p className="text-danger">{user.passwordError}</p>
            )}
            <input
              className="form-control mb-2 btn btn-primary"
              type="submit"
              value={newUser ? "Sign up" : "Sign in"}
            />
            <Link
              className="d-flex justify-content-center"
              onClick={() => setNewUser(!newUser)}
              to="/login"
            >
              {newUser ? "I have an account" : "Create new account"}
            </Link>
          </form>
        </div>
      </div>
      <div className="mt-3 button-container mb-5">
        {
            !user.isLogin && <button className="signIn-btn btn btn-secondary" onClick={googleLogIn}>
            <img src={googleIcon} alt="" />
            continue with google
          </button>
        }
      </div>
    </div>
  );
};

export default Login;
