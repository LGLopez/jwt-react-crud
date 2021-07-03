import React, { Fragment, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

// Components
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  }

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
