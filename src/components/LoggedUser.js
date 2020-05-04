import React,{useState} from "react";
import { useSelector } from "react-redux";
import firebase from 'firebase/app'
import 'firebase/auth';
import validateEmail from '../Auxiliar/ValidateEmail'

export default function LoggedUser() {
  let userAuth = useSelector((state) => state.userAuth);
  let [password ,setPassword] = useState('')
  let [updateEmail, setUpdateEmail] = useState("");
  let [name, setName] = useState("");
  let [phoneNumber, setPhoneNumber] = useState("");

  function logOutHandler() {
    firebase.auth().signOut();
  }

  function updateEmailHandler(email) {
    if (validateEmail(email)) {
      let user = firebase.auth().currentUser;
      user
        .updateEmail(email)
        .then(function () {
          // Update successful.
          document.location.reload(true);
        })
        .catch(function (error) {
          // An error happened.
          console.log(error);
        });
    } else {
      alert("Wrong email");
    }
  }

  function updateNameHandler(name) {
    if (name.trim() !== "") {
      let user = firebase.auth().currentUser;
      user
        .updateProfile({
          displayName: name,
        })
        .then(function () {
          document.location.reload(true);
        })
        .catch(function (error) {
          console.log(error);
          alert("Please , try again later");
        });
    } else {
      alert("Type one or more characters");
    }
  }

  function updatePhoneHandler(phoneNumber) {
    let check = phoneNumber.split("").every((el) => el >= 0);
    console.log(phoneNumber.split(""));
    console.log(check);
    if (phoneNumber.length < 10 || !check) {
      alert("Telephone number must have at least 10 number characters");
      return;
    }
    let user = firebase.auth().currentUser;
    user
      .updateProfile({
        photoURL: phoneNumber,
      })
      .then(function () {
        document.location.reload(true);
      })
      .catch(function (error) {
        console.log(error);
        alert("Please , try again later");
      });
  }

  function updatePassword(password) {
    var user = firebase.auth().currentUser;
    if (password.length >= 6) {
      user
        .updatePassword(password)
        .then(function () {
          setPassword("");
          alert("Password was changed !");
          // Update successful.
        })
        .catch(function (error) {
          // An error happened.
          alert(error);
        });
    } else {
      alert("The password must have 6 characters");
    }
  }
  return (
    <div className="logged-page">
      {userAuth && <button onClick={logOutHandler}>LOG OUT </button>}

      {userAuth && userAuth.email && <p>Your email is : {userAuth.email}</p>}
      {userAuth && (
        <>
          <input
            type="email"
            placeholder="email"
            value={updateEmail}
            onChange={(e) => setUpdateEmail(e.target.value)}
          ></input>

          <button onClick={() => updateEmailHandler(updateEmail)}>
            SET EMAIL{" "}
          </button>
        </>
      )}

      {userAuth && (
        <>
          {userAuth.displayName === null ? (
            <p>Set your name:</p>
          ) : (
            <p>Your name:{userAuth.displayName}</p>
          )}
          <input
            type="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>

          <button onClick={() => updateNameHandler(name)}>SET NAME </button>
        </>
      )}

      {userAuth && (
        <>
          {userAuth.photoURL === null ? (
            <p>Set your phone number:</p>
          ) : (
            <p>Your number:{userAuth.photoURL}</p>
          )}
          <input
            id="tel"
            type="tel"
            placeholder="phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          ></input>

          <button onClick={() => updatePhoneHandler(phoneNumber)}>
            SET NUMBER{" "}
          </button>
        </>
      )}

      {userAuth && (
        <>
          <p>Set password </p>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>

          <button onClick={() => updatePassword(password)}>SUBMIT</button>
        </>
      )}
    </div>
  );
}
