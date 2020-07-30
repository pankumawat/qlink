import React, { Component } from "react";
import { getAccessToken, getLoggedInUser } from '../core'
import { Table } from 'react-bootstrap';
const config = require("../config.json");

export default class UserLinks extends Component {
    constructor(props) {
        super(props);
        this.user = getLoggedInUser();
        this.accessToken = getAccessToken();
        this.state = {};
        this.updateState = this.updateState.bind(this);
        setTimeout(this.updateState, 100);
    }

    updateState = function () {
        setTimeout(this.updateState, 5000);
        fetch(`${config.API_BASE_URL}${config.API_URL.LINKS}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${this.accessToken}`
            }
        })
            .then(
                response => {
                    response.json().then(body => {
                        if (response.ok) {
                            this.setState({ currentTime: Date.now(), links: body.data.links});
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
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Tag</th>
                            <th>Hits</th>
                            <th>Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {   this.state.links &&
                            Object.keys(this.state.links).map((value, index) => {
                                const obj = this.state.links[value];
                                return <tr key={`TR_${index}`}>
                                    <td key={`TD1_${index}`}>{`${config.API_BASE_URL}/0/${obj.shortName}`}</td>
                                    <td key={`TD2_${index}`}>{obj.hits}</td>
                                    <td key={`TD3_${index}`}><a href={obj.url} taget="_blank">Link</a></td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
            </>
        );
    }
}