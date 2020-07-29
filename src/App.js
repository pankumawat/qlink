import React, { useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './index.css';
import { isLoggedIn, unsetLoginParams,getLoggedInUser } from './core'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Dropdown } from 'react-bootstrap';

import Home from "./components/home.component";
import Login from "./components/login.component";
import SignUp from "./components/signup.component";

function App() {
  const [session, setSession] = useState({ loggedIn: isLoggedIn()});
  
  const loginSuccess = function () {
    setSession({loggedIn: true});
  }

  const logout = function (e) {
    e.preventDefault();
    setSession({ loggedIn: false });
    unsetLoginParams();
  }

  return (<Router>
    <div className="App">
      <nav className="navbar navbar-light">
            <ul className="navbar-nav ml-3">
              {session.loggedIn ?
                <li className="nav-item">
                <Dropdown>
                  <Dropdown.Toggle variant="success">
                      {getLoggedInUser().fname}
                </Dropdown.Toggle>

                  <Dropdown.Menu>
                      <Dropdown.Item><Link className="nav-link" to={"/profile"}>Profile</Link></Dropdown.Item>
                      <Dropdown.Item><Link className="nav-link" to={"/settings"}>Settings</Link></Dropdown.Item>
                     <Dropdown.Item><Link className="nav-link" to={"/"} onClick={logout}>Logout</Link></Dropdown.Item>
                  </Dropdown.Menu>
                    </Dropdown>
                  </li>
                :
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>Register</Link>
                </li>
                }
            </ul>
      </nav>
      {
        session.loggedIn ?
          <>
            <br />
            <div className="container-fluid text-center py-5 home-container">
            <Home />
            </div>
            </>
          :
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Switch>
                <Route exact path='/sign-up' render={function (props) {
                  return <SignUp {...props} />
                }} />
                <Route exact path='/logout' render={function (props) {
                  return <Login {...props} />;
                }} />
                <Route path='/' render={function (props) {
                  return <Login {...props} loginSuccess={loginSuccess} />
                }} />
              </Switch>
            </div>
          </div>   
      }
    </div></Router>
  );
}

export default App;