import React, { Component } from "react";
import UserLinks from "./userlinks.component";
import CreateLink from "./createlink.component";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.user = JSON.parse(sessionStorage.getItem("user"));
        this.expireAt = sessionStorage.getItem("expireAt");
        this.state = { currentTime: Date.now() };
        this.updateState = this.updateState.bind(this);
        //setTimeout(this.updateState, 3000);
    }
    updateState = function () {
        //setTimeout(this.updateState, 1000);
        this.setState({ currentTime: Date.now() });
    }

    render() {
        return (
            <>
                <h2>Welcome {this.user.fname}</h2>
                <CreateLink />
                <br />
                <h3>User Links</h3>
                <UserLinks />
            </>
        );
    }
}