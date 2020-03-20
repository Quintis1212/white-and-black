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
// import { useSelector,useDispatch } from 'react-redux';


function App() {
  // let data = useSelector(state => state)
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   // Обновляем заголовок документа с помощью API браузера
  //   console.log('use effect')
  //   dispatch({type:'SET-DATA'})
  // });

  return (
    <Router>
      <Navbar/>
      <Switch>
    <Route exact path="/home-page" component={HomePage}  />
    <Route exact path="/search/:searchParams" component={SearchPage}  />
    {/* <Route exact path="/blog" component={BlogPage}  />
    <Route exact path="/authorisation" component={BlogPage}  />
    <Route exact path="/item/:slug" component={ProductPge}  /> */}
    <Redirect exact from="" to="/home-page" />
    </Switch>
    </Router>
  );
}

export default App;
