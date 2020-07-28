import React, { useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./components/home.component";
import Login from "./components/login.component";
import SignUp from "./components/signup.component";

function App() {
  let loggedInStatus = false;
  let user = undefined;
  let accessToken = undefined;
  if (sessionStorage.getItem("expireAt") && (sessionStorage.getItem("expireAt") - Date.now()) > 0) {
    loggedInStatus = true;
    user = sessionStorage.getItem("user");
    accessToken = sessionStorage.getItem("accessToken");
  }
  
  const [session, setSession] = useState({
    user: user,
    accessToken: accessToken,
    loggedIn: loggedInStatus
  });

  const loginSuccess = function (accessToken, expireAt, user) {
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("expireAt", expireAt);
    sessionStorage.setItem("user", user);
    setSession({ accessToken: accessToken, loggedIn: true, user: user, expireAt: expireAt });
  }

  const logout = function (e) {
    e.preventDefault();
    setSession({ accessToken: undefined, loggedIn: false });
    sessionStorage.setItem("expireAt", 0);
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
                  <Link className="nav-link" onClick={logout} to={"/sign-in"}>SignOut</Link>
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