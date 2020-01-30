import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';

export class Logout extends Component {
    static displayName = Logout.name;

    constructor() {
        super();

        this.cookie = new Cookies();
    }



    componentWillMount() {
        // removing cookies
        this.cookie.remove("vibe_cookies");
    }



    render() {
        // check and redirect
        if (this.cookie.get("vibe_cookies") == undefined) {
            return <Redirect to='/' />;
        }

        return (
            <div>
                <p>
                    If the page didn't redirect click <a href="/" alt="signin">here</a>
                </p>
            </div>
        );
    }
}
