import React, { Component } from 'react';
import { Left } from './Sub/Left';
import { Nav } from './Sub/Nav';
import { Right } from './Sub/Right';

import '../../../static/css/style.css';


export class Header extends Component {
  static displayName = Header.name;




  render () {
    return (
      <header>
          <div className="container">
            <div className="header-data">
                <Left />
                <Nav />
                <Right />
            </div> {/** header-data end */}
          </div> {/*container end*/}
      </header>
    );
  }
}
