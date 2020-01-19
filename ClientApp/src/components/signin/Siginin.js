import React, { Component } from 'react';

export class Signin extends Component {
  static displayName = Signin.name;




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
									
									<h3>Sign in</h3>
									<form>
										<div className="row">
											<div className="col-lg-12 no-pdd">
												<div className="sn-field">
													<input type="text" name="username" placeholder="Username" />
													<i className="la la-user"></i>
												</div>
											</div>
											<div className="col-lg-12 no-pdd">
												<div className="sn-field">
													<input type="password" name="password" placeholder="Password" />
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
												<button type="submit" value="submit">Sign in</button>
											</div>
										</div>
									</form>
								</div>
								<div className="sign_in_sec" id="tab-2">
					
									<div className="dff-tab current" id="tab-3">
										<form>
											<div className="row">
												<div className="col-lg-12 no-pdd">
													<div className="sn-field">
														<input type="text" name="name" placeholder="Full Name" />
														<i className="la la-user"></i>
													</div>
												</div>
												<div className="col-lg-12 no-pdd">
													<div className="sn-field">
														<input type="text" name="country" placeholder="Country" />
														<i className="la la-globe"></i>
													</div>
												</div>
												<div className="col-lg-12 no-pdd">
                                                    <div className="sn-field">
                                                        <input type="text" name="Email" placeholder="Email" />
                                                        <i className="la la-envelope"></i>
                                                    </div>
                                                </div>
												<div className="col-lg-12 no-pdd">
													<div className="sn-field">
														<input type="password" name="password" id="signup-password" placeholder="Password" />
														<i className="la la-lock"></i>
													</div>
												</div>
												<div className="col-lg-12 no-pdd">
													<div className="sn-field">
														<input type="password" name="repeat-password" id="signup-repeat-password" placeholder="Repeat Password" />
														<i className="la la-lock"></i>
													</div>
												</div>
												<div className="col-lg-12 no-pdd">
													<div className="checky-sec st2">
														<div className="fgt-sec">
															<input type="checkbox" name="cc" id="c2" />
															<label htmlFor="c2">
																<span></span>
															</label>
															<small>Yes, I understand and agree to the Vibe Terms & Conditions.</small>
														</div>
													</div>
												</div>
												<div className="col-lg-12 no-pdd">
													<button type="submit" value="submit">Get Started</button>
												</div>
											</div>
										</form>
									</div>
									<div className="dff-tab" id="tab-4">
										<form>
											<div className="row">
												<div className="col-lg-12 no-pdd">
													<div className="sn-field">
														<input type="text" name="company-name" placeholder="Company Name" />
														<i className="la la-building"></i>
													</div>
												</div>
												<div className="col-lg-12 no-pdd">
													<div className="sn-field">
														<input type="text" name="country" placeholder="Country" />
														<i className="la la-globe"></i>
													</div>
												</div>
												<div className="col-lg-12 no-pdd">
													<div className="sn-field">
														<input type="password" name="password" placeholder="Password" />
														<i className="la la-lock"></i>
													</div>
												</div>
												<div className="col-lg-12 no-pdd">
													<div className="sn-field">
														<input type="password" name="repeat-password" placeholder="Repeat Password" />
														<i className="la la-lock"></i>
													</div>
												</div>
												<div className="col-lg-12 no-pdd">
													<div className="checky-sec st2">
														<div className="fgt-sec">
															<input type="checkbox" name="cc" id="c3" />
															<label htmlFor="c3">
																<span></span>
															</label>
															<small>Yes, I understand and agree to the Vibe Terms & Conditions.</small>
														</div>
													</div>
												</div>
												<div className="col-lg-12 no-pdd">
													<button type="submit" value="submit">Get Started</button>
												</div>
											</div>
										</form>
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
