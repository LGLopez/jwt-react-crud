import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Components
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

toast.configure();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  }

  const isAuth = async () => {
    try {
      // Verify if user already has a valid token
      const response = await fetch('http://192.168.135.128:3001/auth/verify', {
        method: 'GET',
        headers: {token: localStorage.token}
      });
      const parseResponse = await response.json();
      
      parseResponse === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth();
  }, [])

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/login" render={ props => !isAuthenticated ? (<Login {...props} setAuth={setAuth} />) : (<Redirect to="/dashboard" /> ) } />;
            <Route exact path="/register" render={props => !isAuthenticated ? (<Register {...props} setAuth={setAuth} />) : (<Redirect to="/login" /> ) }/>;
            <Route exact path="/dashboard" render={props => isAuthenticated ? ( <Dashboard {...props} setAuth={setAuth} />) : ( <Redirect to="/login" /> )}/>;
            <Route exact path="/" render={props => !isAuthenticated ? ( <Redirect to="/login"/>): (<Redirect to="/dashboard"/> )}/>
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
