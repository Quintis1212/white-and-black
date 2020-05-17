import React,{useEffect} from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './Styles.css';
import ProductPageWrapper from './pages/ProductPageWrapper';
import Basket from './pages/Basket';
import Authorisation from './pages/Authorisation';
import OrderSended from './pages/OrderSended';
import OrderSending from './pages/OrderSending';
import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/storage'; 
import { useDispatch } from 'react-redux';
import PasswordReset from './pages/PasswordReset';
import axios from './axios'


function App() {
  let dispatch = useDispatch()
  
  const firebaseConfig = {
    apiKey: "AIzaSyDZ6W1HGWxtqMZEXm9m0HcMhddabl26zdU",
    authDomain: "white-and-black-349d9.firebaseapp.com",
    databaseURL: "https://white-and-black-349d9.firebaseio.com",
    projectId: "white-and-black-349d9",
    storageBucket: "white-and-black-349d9.appspot.com",
    messagingSenderId: "928444769778",
    appId: "1:928444769778:web:eb4809ae7f24ec45de776b"
  };

  function onAuthStateChange () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch({type:'LOGGED',user:user})
      } else {
        dispatch({type:'LOG-OUT'})
      }
    });
  }


  useEffect(() => {
    firebase.initializeApp(firebaseConfig)
    const unsubscribe = onAuthStateChange()
    axios.get('/data.json')
    .then(res=> {
        dispatch({type:'SET-DATA-FROM-SERVER',data:res.data})
    })
    .catch(function (error) {
      console.log(error);
    })
    return () => {
        unsubscribe();
      }
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Router>
      <Navbar/>
      <Switch>
      <Redirect from="*//*" to="*/*" />
    <Route exact path="/home-page" component={HomePage}  />
    <Route exact path="/search/:searchParams" component={SearchPage}  />
    <Route exact path="/basket" component={Basket}  />
    <Route exact path="/order-sended" component={OrderSended}  />
    <Route exact path="/order-sending" component={OrderSending}  />
    <Route exact path="/authorisation" component={Authorisation}  />
    <Route exact path="/authorisation/sendPasswordResetEmail" component={PasswordReset}  /> 
    <Route exact path="/search/:searchParams/:item" component={ProductPageWrapper}  />
    <Redirect exact from="/" to="/home-page" />
    </Switch>
    </Router>
  );
}

export default App;
