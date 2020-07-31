import React, { Component, createRef } from "react";
import { getAccessToken, getLoggedInUser, toasty as toast, globalFunction } from '../core'
const config = require("../config.json");

export default class CreateLink extends Component {
    constructor(props) {
        super(props);
        this.user = getLoggedInUser();
        this.accessToken = getAccessToken();
        this.customLinksAllowed = (this.user.flags.customLinks === undefined && this.user.flags.customLinks === false);
        this.sentCreateLinkRequest = this.sentCreateLinkRequest.bind(this);
    }

    shortName = createRef();
    longUrl = createRef();

    sentCreateLinkRequest = function () {
        fetch(`${config.API_BASE_URL}${config.API_URL.CREATE_LINK}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${this.accessToken}`
            },
            body: JSON.stringify({
                shortName: this.shortName.current.value,
                url: this.longUrl.current.value
            })
        })
            .then(
                response => {
                    response.json().then(body => {
                        if (response.ok) {
                            this.shortName.current.value = "";
                            this.longUrl.current.value = "";
                            globalFunction.onDemandFetch && globalFunction.onDemandFetch();
                        }
                        else
                            toast().error(body.error || body);
                    })
                },
                error => {
                    toast().error(error.error || error);
                })
            .catch(err => {
                toast().error(err.error || err);
            });
    }

    render() {
        return (
            <>
            <h3>Create Short Url</h3>
        
            <div className="form-group">
                    <input type="text" ref={this.shortName} className="form-control" placeholder={this.customLinksAllowed ? 'Enter Short Name' : ' Custom short names are only allowed to premium users.'} disabled={!this.customLinksAllowed}/>
                    <br/>
                    <input type="url" ref={this.longUrl} className="form-control" placeholder="Enter URL"/>
                    <br />
                    <button type="submit" className="btn btn-primary btn-block" onClick={this.sentCreateLinkRequest}>Create Link</button>
            </div>
            </>
        );
    }
}