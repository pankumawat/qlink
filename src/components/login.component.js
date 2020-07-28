import React, { Component, createRef, useState } from "react";
const config = require("../config.json");

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.attemptLogin = this.attemptLogin.bind(this);
        this.loginSuccess = props.loginSuccess;
    }

    //setState

    usernameRef = createRef();
    passwordRef = createRef();
    //remembermeRef = createRef();

    attemptLogin(e) {
        e.preventDefault();
        const loginUrl = `${config.API_BASE_URL}${config.API_URL.LOGIN}`;
        fetch(loginUrl, {
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
                            this.loginSuccess(body.accessToken, JSON.stringify(body.user))
                        }
                        else
                            console.log(body);
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
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" ref={this.usernameRef} className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" ref={this.passwordRef} className="form-control" placeholder="Enter password" />
                </div>
                <button type="submit" className="btn btn-primary btn-block" onClick={this.attemptLogin}>Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </>
        );
    }
}