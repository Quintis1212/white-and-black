import React, { useState } from 'react';
import firebase from 'firebase/app'
import 'firebase/auth';
import {  useSelector } from 'react-redux';



export default function Authorisation() {
    let [password ,setPassword] = useState('123456')
    let [email, setEmail] = useState('frey1@meta.ua')
    let userAuth = useSelector(state => state.userAuth)
    let [updateEmail , setUpdateEmail] = useState('')
    let [name , setName] = useState('');
    let [phoneNumber,setPhoneNumber] = useState('');

    function logInHandler () {
          const auth = firebase.auth()
          const promise = auth.signInWithEmailAndPassword(email,password)
          promise.catch(err =>{  
                console.log(err.message)
                if (err.message === "There is no user record corresponding to this identifier. The user may have been deleted."){
                    alert('There is no user record corresponding to this email, please sign up')
                }
             })

    }

    function singUpHandler () {
        const auth = firebase.auth()
        const promise = auth.createUserWithEmailAndPassword(email,password)
        promise
            .then(res => console.log(res))
            .catch(err => { 
                alert(err)
                console.log(err)})
    }

    function logOutHandler(){
        firebase.auth().signOut()
    }


    function  updateEmailHandler (email) {
        if (validateEmail(email)) { 
            let  user = firebase.auth().currentUser;
            user.updateEmail(email).then(function() {
            // Update successful.
            document.location.reload(true)
    
            }).catch(function(error) {
            // An error happened.
            console.log(error)
            });
        } else {
            alert('Wrong email')
        }


    }

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    function updateNameHandler (name) {
        if (name.trim() !== '' ) {
            let  user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: name,
              }).then(function() {
                document.location.reload(true)
              }).catch(function(error) {
                  console.log(error)
                  alert('Please , try again later')
              });
        } else {
            alert('Type one or more characters')
        }

    }

    function updatePhoneHandler (phoneNumber) {
        let check = phoneNumber.split('').every(el=>  el >= 0)
        console.log(phoneNumber.split(''))
        console.log(check)
        if (phoneNumber.length < 10 || !check){
            alert('Telephone number must have at least 10 number characters')
            return
        }
        let  user = firebase.auth().currentUser;
        user.updateProfile({
            photoURL: phoneNumber,
          }).then(function() {
            document.location.reload(true)
          }).catch(function(error) {
              console.log(error)
              alert('Please , try again later')
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

            
                {userAuth && userAuth.email &&
                <p>Your email is : {userAuth.email}</p> 
                
                }
            {userAuth && 
            <div>
        <input type="email" placeholder="email" value={updateEmail} onChange={(e)=>setUpdateEmail(e.target.value)} ></input>

            <button onClick={()=>updateEmailHandler(updateEmail)}>SET EMAIL  </button>

            </div>
            }

            {userAuth && 
            <>
               {userAuth.displayName === null? <p>Set your name:</p> : <p>Your name:{userAuth.displayName}</p>}
<input type="name" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)} ></input>

<button onClick={()=>updateNameHandler(name)}>SET NAME </button>

</>
            }

{userAuth && 
            <>
               {userAuth.photoURL === null? <p>Set your phone number:</p> : <p>Your number:{userAuth.photoURL}</p>}
<input id="tel" type="tel" placeholder="phone number" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} ></input>

<button onClick={()=>updatePhoneHandler(phoneNumber)}>SET NUMBER </button>

</>
            }

            

        </div>
    )
}


