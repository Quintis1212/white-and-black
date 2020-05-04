import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validateEmail from "../Auxiliar/ValidateEmail";
import LoggedUser from "../components/LoggedUser";

export default function Authorisation() {
  let [password, setPassword] = useState("");
  let [email, setEmail] = useState("");
  let userAuth = useSelector((state) => state.userAuth);

  function logInHandler() {
    const auth = firebase.auth();
    if (validateEmail(email) && password.length >= 6) {
      const promise = auth.signInWithEmailAndPassword(email, password);
      promise.then(setPassword("")).catch((err) => {
        alert(err.message);
      });
    } else if (!validateEmail(email)) {
      alert("The email is not correct");
    } else if (password.length < 6) {
      alert("The password must have 6 characters");
    }
  }

  function singUpHandler() {
    if (validateEmail(email) && password.length >= 6) {
      const auth = firebase.auth();
      const promise = auth.createUserWithEmailAndPassword(email, password);
      promise
        .then((res) => {
          setPassword("");
          console.log(res);
        })
        .catch((err) => {
          alert(err);
          console.log(err);
        });
    } else if (!validateEmail(email)) {
      alert("The email is not correct");
    } else if (password.length < 6) {
      alert("The password must have 6 characters");
    }
  }

  return (
    <div className="authorisation-page">
        {!userAuth && <>
            <h2>Authorisation page</h2>
      <p>Please type your email and password to log in or to sign up!</p>
        </>}

      {!userAuth && (
        <>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button onClick={logInHandler}>LOG IN</button>
          <p>or</p>
          <button onClick={singUpHandler}>SING UP </button>
          <Link to={`/authorisation/sendPasswordResetEmail`}>
            <button className="product-card-brand">
              FORGET YOUR PASSWORD ...
            </button>
          </Link>
        </>
      )}
      <LoggedUser />
    </div>
  );
}
