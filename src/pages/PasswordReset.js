import React,{useState} from 'react';
import firebase from 'firebase/app'
import 'firebase/auth';
import validateEmail from '../Auxiliar/ValidateEmail'
import { Link } from "react-router-dom";


export default function PasswordReset() {
    let [email, setEmail] = useState('')

    function resetPassword(){
        if (validateEmail(email)){
            let auth = firebase.auth();
            auth.sendPasswordResetEmail(email).then(function() {
            // Email sent.
            alert('Reset email successfully sent')
            })
            .then( res =>   window.history.back()) 
            .catch(function(error) {
            // An error happened.
            });
        } else {
            alert('Email not valid')
        }

    }

    return (
        <div className="password-reset-email">
            <input type="email"
            placeholder="email" 
            value={email} onChange={(e)=>setEmail(e.target.value)}></input>
            <button onClick={resetPassword}>RESET PASSWORD</button>
            <Link to={`/authorisation`}>
                          <button className="product-card-brand">BACK</button>
            </Link>
        </div>
    )
}
