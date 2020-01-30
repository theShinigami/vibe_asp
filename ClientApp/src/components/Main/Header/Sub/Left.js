import React, { Component } from 'react'

import '../../../../static/css/style.css';

export class Left extends Component {
    static displayName = Left.name;

    render() {
        return (
            <div>
                <div className="logo">
					<a href="index.html" title=""><img src="images/logo.png" alt="" /></a>
				</div>
				<div className="search-bar">
                    <form>
                        <input type="text" name="search" placeholder="Search..." />
                        <button type="submit"><i className="la la-search"></i></button>
                    </form>
				</div>
            </div>
        )
    }
}
