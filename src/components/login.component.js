import React, { Component, createRef, useState } from "react";
import { Link } from "react-router-dom";
import { setLoginParams } from '../core'
const config = require("../config.json");

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.attemptLogin = this.attemptLogin.bind(this);
        this.loginSuccess = props.loginSuccess;
        this.sessionStorage = sessionStorage;
    }

    //setState
    usernameRef = createRef();
    passwordRef = createRef();
    //remembermeRef = createRef();

    attemptLogin(e) {
        e.preventDefault();
        fetch(`${config.API_BASE_URL}${config.API_URL.LOGIN}`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                username: this.usernameRef.current.value,
                password: this.passwordRef.current.value
            })
        })
            .then(
                response => {
                    response.json().then(body => {
                        if (response.ok) {
                            setLoginParams(body.accessToken, body.expireAt, JSON.stringify(body.user))
                            this.loginSuccess();
                        }
                        else
                            console.error(body);
                    })

                },
                error => {
                    console.dir(error);
                    console.log(error);
                })
            .catch(err => {
                console.log(err);
            });
    }
    
    render() {
        return (
            <>
                <h3>Sign In <Link to={"/sign-up"}>Register</Link></h3>
                {this.sessionStorage ? <><div className="form-group">
                    <label className="required-field">Username</label>
                    <input type="email" ref={this.usernameRef} className="form-control" placeholder="Enter username" />
                </div>

                    <div className="form-group">
                        <label className="required-field">Password</label>
                        <input type="password" ref={this.passwordRef} className="form-control" placeholder="Enter password" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" onClick={this.attemptLogin}>Submit</button>
                    <p className="forgot-password text-right">
                        Forgot <a href="#">password?</a>
                    </p>
                    
                </> : <>
                        <p className="text-center text-danger">Time to switch to a modern browser.<br/>You can try following options:</p>
                        <div className= "text-center">
                            <a href="https://www.google.com/chrome" target="_blank">
                                <img src="https://www.google.com/chrome/static/images/chrome-logo.svg" alt="Google Chrome" width="50" height="60" />   &nbsp;
                            </a>
                            <a href="https://www.mozilla.org/en-US/firefox/new/" target="_blank">
                                <img src="https://www.mozilla.org/media/protocol/img/logos/firefox/browser/logo-md.f0603b4c28b4.png" alt="Mozilla Firefox" width="90" height="100" />
                            </a>
                            <a href="https://www.microsoft.com/en-us/edge" target="_blank">
                                <img src="https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4nqTh" alt="Microsoft Edge" width="70" height="60" />
                            </a>
                        </div>
                    </>}
                
            </>
        );
    }
}