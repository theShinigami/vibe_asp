import React, { Component } from 'react';
import { Sigin } from '../Form/Sigin';
import { Signup } from '../Form/Signup';

export class SigninAndSignup extends Component {
  static displayName = SigninAndSignup.name;


  submitSignup(e) {
	  e.preventDefault();
	  console.log("submitting...");
  }



  render () {
    return (
      <div className="sign-in-page">
          <div className="signin-popup">
              <div className="signin-pop">
              <div className="row">
						<div className="col-lg-6">
							<div className="cmp-info">
								<div className="cm-logo">
									{/* <img src="images/cm-logo.png" alt="" /> */}
                                    <p><font size="100" color="red">Vibe</font></p>
                                    <br />
									<p>Vibe, is a social networking platform that allows people to connect in person rather than only in your 4 inch screen.</p>
								</div>	
								<img src="images/cm-main-img.png" alt="" />			
							</div>
						</div>
						<div className="col-lg-6">
							<div className="login-sec">
								<ul className="sign-control">
									<li data-tab="tab-1" className="current"><a href="#" title="">Sign in</a></li>				
									<li data-tab="tab-2"><a href="#" title="">Sign up</a></li>
								</ul>			
								<div className="sign_in_sec current" id="tab-1">
									<Sigin />
								</div>
								<div className="sign_in_sec" id="tab-2">
					
									<div className="dff-tab current" id="tab-3">
										<Signup />
									</div>
									
								</div>		
							</div>
						</div>
              </div>
          </div>
      </div>
      </div>
    );
  }
}
