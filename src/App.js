import React, { useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./components/home.component";
import Login from "./components/login.component";
import SignUp from "./components/signup.component";

function App() {
  let loggedInStatus = false;
  if (sessionStorage.getItem("accessToken")) {
    loggedInStatus = true;
  }
  let [session, setSession] = useState({
    user: undefined,
    accessToken: undefined,
    loggedIn: loggedInStatus
  });
  const loginSuccess = function (accessToken, user) {
    setSession({ accessToken: accessToken, loggedIn: true, user: user });
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("user", user);
  }

  const logout = function () {
    setSession({ accessToken: undefined, loggedIn: false });
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("user");
  }

  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/sign-in"}></Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                { session.loggedIn ?
                  <Link className="nav-link" onClick={logout}>SignOut</Link>
                  :
                  <Link className="nav-link" to={"/sign-up"}>Register</Link>
                }
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' render={function (props) {
              return session.loggedIn ? <Home {...props}/> : <Login {...props} loginSuccess={loginSuccess} />
            }} />
            <Route exact path='/sign-in' render={function (props) {
              return session.loggedIn ? <Home {...props} /> : <Login {...props} loginSuccess={loginSuccess} />
            }} />
            <Route exact path='/sign-up' render={function (props) {
              return session.loggedIn ? <Home {...props} /> : <SignUp {...props} loginSuccess={loginSuccess} />
            }} />
            <Route exact path='/logout' render={function (props) {
              if (session.loggedIn)
              logout();
              return <Login {...props} loginSuccess={loginSuccess} />;
            }} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;