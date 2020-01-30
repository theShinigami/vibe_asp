import React, { Component } from 'react'
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';

export class Sigin extends Component {
    static displayName = Sigin.name;

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cookies = new Cookies();

        this.state = {
            signinButtonText: <b>Sign in</b>,
            userData: null,
            inputStyle: { border: "1px solid #e5e5e5"},
            loggedIn: false
        }

    }


    componentDidUpdate() {
        // check if user has logged in
        console.log("ComponetDidUpdate...");
        console.info("loggedIn: ", this.state.loggedIn);
        if (this.cookies.get("vibe_cookies") != undefined) {
            if (this.cookies.get("vibe_cookies").status != "Failed") {
                return <Redirect to="/main" />;
            } else {}
        } else {}

    }


    handleSubmit(event) {
        // prevent from page reload
        event.preventDefault();

        const data = new FormData(event.target);
        
        // change button to loading svg
        this.buttonTextToLoadingSVG();


        console.log("Signing in...");
        fetch('/api/Signin', {
            method: 'POST',
            body: data
        }).then(response => response.json())
            .then(postData => {
                this.setState({
                    userData: postData
                });
                console.info("postData: ", postData.status);


                // if faild change back to orginal
                if (postData.status == "Failed") {
                    this.buttonTextToText();
                    this.inputToRed();

                    // Alert
                    Swal.fire({
                        title: '<b>Login</b>',
                        text: 'Invalid username or password.',
                        icon: 'error',
                        showClass: {
                            popup: 'animated fadeInDown faster'
                        },
                        hideClass: {
                            popup: 'animated fadeOutUp faster'
                        }
                    });
                } else {
                    this.buttonTextToLoadingSVG();
                    this.inputToWhite();

                    // set data to cookie
                    this.cookies.set('vibe_cookies', postData, { path: '/'});

                    // set the login state bool
                    this.setState({
                        loggedIn: true
                    });
                }
        });
    }


    buttonTextToLoadingSVG() {
        this.setState({
            signinButtonText: <img src="/SVG/double_ring.svg" />
        });
    }

    buttonTextToText() {
        this.setState({
            signinButtonText: <b>Sign in</b>
        });
    }

    inputToRed() {
        this.setState({
            inputStyle: { border: "1px solid red" }
        });
    }

    inputToWhite() {
        this.setState({
            inputStyle: { border: "1px solid #e5e5e5"}
        });
    }


    render() {
        
        
        if (this.cookies.get("vibe_cookies") != undefined) {
            if (this.cookies.get("vibe_cookies").status != "Failed") {
                return <Redirect to='/main' />;
            } else {}
        } else {}

        return (
            <div>
                <h3>Sign in</h3>
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-lg-12 no-pdd">
                                <div className="sn-field">
                                    <input required style={this.state.inputStyle} type="text" name="username" id="signin-username" placeholder="Username" />
                                    <i className="la la-user"></i>
                                </div>
                            </div>
                            <div className="col-lg-12 no-pdd">
                                <div className="sn-field">
                                    <input required style={this.state.inputStyle} type="password" name="password" id="signin-password" placeholder="Password" />
                                    <i className="la la-lock"></i>
                                </div>
                            </div>
                            <div className="col-lg-12 no-pdd">
                                <div className="checky-sec">
                                    <div className="fgt-sec">
                                        <input type="checkbox" name="cc" id="c1" />
                                        <label htmlFor="c1">
                                            <span></span>
                                        </label>
                                        <small>Remember me</small>
                                    </div>
                                    <a href="#" title="">Forgot Password?</a>
                                </div>
                            </div>
                            <div className="col-lg-12 no-pdd">
                                <button name="Signin-Btn" id="Signin-Btn">{this.state.signinButtonText}</button>
                            </div>
                        </div>
                    </form>
            </div>
        )
    }
}
