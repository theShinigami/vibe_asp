import React, { Component } from 'react';
import { Signin } from './signin/Siginin';
import { Footer } from './Footer/Footer';

import '../static/css/animate.css';
import '../static/css/bootstrap.min.css';
import '../static/css/line-awesome.css';
import '../static/css/line-awesome-font-awesome.min.css';
import '../static/vendor/fontawesome-free/css/all.min.css';
import '../static/css/font-awesome.min.css';
import '../static/lib/slick/slick.css';
import '../static/lib/slick/slick-theme.css';
import '../static/css/style.css';
import '../static/css/responsive.css';


export class Index extends Component {
  static displayName = Index.name;



  componentWillMount() {
      document.body.className = "sign-in";
      document.body.oncontextmenu = "return false;";

  }

  componentWillUnmount() {
      document.body.className = null;
      document.body.oncontextmenu = null;
  }


  render () {
    return (
        <React.Fragment>
            <div className="wrapper">
                <Signin />
            </div> {/* wrapper end */}
            <Footer />
        </React.Fragment>
    );
  }
}
