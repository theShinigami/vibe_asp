import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Index } from './components/Index';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  componentWillMount() {
    console.info("--> Including js files...");
    this.loadJSfile();
  }
  


loadJSfile() {
  const jsFiles = [
      'js/jquery.min.js',
      'js/popper.js',
      'js/bootstrap.min.js',
      'lib/slick/slick.min.js',
      'js/script.js'
  ];
  
  for (var i=0; i<jsFiles.length; i++) {
      // create the tag
      let script = document.createElement("script");

      // add the src and true for async
      script.src = "https://localhost:5001/" + jsFiles[i];
      script.async = false;

      // set an id
      script.id = "script" + i;

      // append to body
      document.body.appendChild(script);
  }

}


  render () {
    return (
      <Layout>
        <Route exact path='/' component={Index} />
      </Layout>
    );
  }
}
