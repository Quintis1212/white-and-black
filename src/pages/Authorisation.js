import React, { useState } from 'react';
import firebase from 'firebase/app'
import 'firebase/auth';
import {  useSelector, useDispatch } from 'react-redux';



export default function Authorisation() {
    let [password ,setPassword] = useState('123456')
    let [email, setEmail] = useState('frey1@meta.ua')
    let userAuth = useSelector(state => state.userAuth)
    let dispatch = useDispatch()
    let [updateEmail , setUpdateEmail] = useState('')

    function logInHandler () {
          const auth = firebase.auth()
          const promise = auth.signInWithEmailAndPassword(email,password)
          promise.catch(err => console.log(err))

    }

    function singUpHandler () {
        const auth = firebase.auth()
        const promise = auth.createUserWithEmailAndPassword(email,password)
        promise
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    function logOutHandler(){
        firebase.auth().signOut()
    }

    function sendEmailVerification() {
        let  currentUser = firebase.auth().currentUser;

        currentUser.sendEmailVerification().then(function() {
            let check = firebase.auth().currentUser
            if (check.emailVerified){
                dispatch({type:'LOGGED',user:check})
            }
        }).catch(function(error) {
                console.log(error)      
         });
    }
    function  updateEmailHandler (email) {
        let  user = firebase.auth().currentUser;
        user.updateEmail(email).then(function() {
        // Update successful.
        document.location.reload(true)

        }).catch(function(error) {
        // An error happened.
        });

    }
    
  

    return (
        <div>
            Authorisation page


            {!userAuth && <>
                <input type="email"
                 placeholder="email" 
                 value={email} onChange={(e)=>setEmail(e.target.value)}
                 
                 ></input>
            <input type="password" 
            placeholder="password" 
            value={password} 
            onChange={(e)=>setPassword(e.target.value)} 
             ></input>
            </>}
            
            {!userAuth && <>
                <button onClick={logInHandler}>LOG IN</button>
                <button onClick={singUpHandler}>SING UP </button>
            </>}

            {userAuth && <button onClick={logOutHandler}>LOG OUT </button>}

            {userAuth && userAuth.emailVerified !== true &&
            <div>
              <button onClick={sendEmailVerification}>SEND EMAIL TO VERIFY  </button>
                    <p>After verify please reload page to see the changes</p>
            </div>
            }
            {userAuth && userAuth.emailVerified === true &&
            <p>Your email verified</p>
            }
                {userAuth && userAuth.email &&
                <p>your email is : {userAuth.email}</p> 

                }
            {userAuth && 
            <div>
        <input type="email" placeholder="email" value={updateEmail} onChange={(e)=>setUpdateEmail(e.target.value)} ></input>

            <button onClick={()=>updateEmailHandler(updateEmail)}>UPDATE EMAIL  </button>

            </div>

            }
        </div>
    )
}


