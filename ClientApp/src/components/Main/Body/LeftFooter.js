import React, { Component } from 'react'

export class LeftFooter extends Component {
    static displayName = LeftFooter.name;
    
    render() {
        return (
            <div className="tags-sec full-width">
                <ul>
                    <li><a href="#" title="">Help Center</a></li>
                    <li><a href="#" title="">About</a></li>
                    <li><a href="#" title="">Privacy Policy</a></li>
                    <li><a href="#" title="">Community Guidelines</a></li>
                    <li><a href="#" title="">Cookies Policy</a></li>
                    <li><a href="#" title="">Career</a></li>
                    <li><a href="#" title="">Language</a></li>
                    <li><a href="#" title="">Copyright Policy</a></li>
                </ul>
                <div className="cp-sec">
                    <img width="30" height="30" src="/Pictures/Logo/v-logo.svg" alt=""/>
                    <p><img src="images/cp.png" alt=""/>Copyright 2019</p>
                </div>
			</div>
        )
    }
}
