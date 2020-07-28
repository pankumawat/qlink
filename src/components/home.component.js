import React, { Component, createRef, useState } from "react";
const config = require("../config.json");

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.user = JSON.parse(sessionStorage.getItem("user"));
        this.expireAt = sessionStorage.getItem("expireAt");
        this.state = { currentTime: Date.now() };
        this.updateState = this.updateState.bind(this);
        setTimeout(this.updateState, 3000);
    }
    updateState = function () {
        setTimeout(this.updateState, 1000);
        this.setState({ currentTime: Date.now() });
    }

    render() {
        return (
            <>
                <h3>Welcome {this.user.fname}</h3>
                <h2>You have {Math.round((this.expireAt - Date.now())/1000)} seconds left of your session.</h2>
            </>
        );
    }
}