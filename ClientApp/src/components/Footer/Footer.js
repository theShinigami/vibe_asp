import React, { Component } from 'react';

export class Footer extends Component {
  static displayName = Footer.name;

  render () {
    return (
      <div className="footy-sec">
          <div className="container">
          <ul>
            <li><a href="about.html" title="">About</a></li>
            <li><a href="about.html" title="">Privacy Policy</a></li>
            <li><a href="forum.html" title="">Forum</a></li>
            <li><a href="forum.html" title="">Language</a></li>
            <li><a href="forum.html" title="">Copyright Policy</a></li>
          </ul>
    <p><img src="images/copy-icon.png" alt="" />Copyright { new Date().getFullYear() }</p>
        </div>
      </div>
    );
  }
}
