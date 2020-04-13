import React from 'react';
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
import ProductPage from './pages/ProductPage';
import Basket from './pages/Basket';
import Authorisation from './pages/Authorisation';



function App() {

  return (
    <Router>
      <Navbar/>
      <Switch>
      <Redirect from="*//*" to="*/*" />
    <Route exact path="/home-page" component={HomePage}  />
    <Route exact path="/search/:searchParams" component={SearchPage}  />
    <Route exact path="/basket" component={Basket}  />
     <Route exact path="/authorisation" component={Authorisation}  /> 
    <Route exact path="/search/:searchParams/:item" component={ProductPage}  />
    <Redirect exact from="/" to="/home-page" />
    </Switch>
    </Router>
  );
}

export default App;
