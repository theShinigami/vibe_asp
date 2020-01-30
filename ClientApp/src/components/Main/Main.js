import React, { Component } from 'react';
import { Header } from './Header/Header';
import Cookies from 'universal-cookie';


import { Profile } from './Body/Profile';
import { NavBar } from './Body/NavBar';
import { Suggestions } from './Body/Suggestions';
import { LeftFooter } from './Body/LeftFooter';
import { Post } from './Body/Post';
import { VibeMapView } from './Body/VibeMapView';
import { PostContent } from './Body/PostContent';
import { TopPosts } from './Body/TopPosts';
import { MostViewed } from './Body/MostViewed';
import { MostViewedPeople } from './Body/MostViewedPeople';


import '../../static/css/animate.css';
import '../../static/css/bootstrap.min.css';
import '../../static/css/line-awesome.css';
import '../../static/css/line-awesome-font-awesome.min.css';
import '../../static/vendor/fontawesome-free/css/all.min.css';
import '../../static/css/font-awesome.min.css';
import '../../static/css/jquery.mCustomScrollbar.min.css'
import '../../static/lib/slick/slick.css';
import '../../static/lib/slick/slick-theme.css';
import '../../static/css/style.css';
import '../../static/css/responsive.css';
import { TopProfiles } from './Body/TopProfiles';

export class Main extends Component {
  static displayName = Main.name;


  constructor() {
	  super();

	  this.cookies = new Cookies();

	  this.state = {
		  userData: null,
	  }
  }



  componentWillMount() {
	 document.body.oncontextmenu = "return false;";
	 this.setState({
		 userData: this.cookies.get("vibe_cookies")
	 });
  }

  componentWillUnmount() {
 	document.body.oncontextmenu = null;
  }




  render () {
    return (
      <div className="wrapper">	
		<header>
			<div className="container">
				<NavBar 
				uid={this.state.userData.id}
				/>
			</div>
		</header>	

		<main>
			<div className="main-section">
				<div className="container">
					<div className="main-section-data">
						<div className="row">
							<div className="col-lg-3 col-md-4 pd-left-none no-pd">
								<div className="main-left-sidebar no-margin">
									<Profile 
									fullname={this.state.userData.fullname}
									id={this.state.userData.id}
									picId={this.state.userData.picture}
									/>

									<Suggestions 
									uid={this.state.userData.id}
									/>
									<LeftFooter />
								</div>
							</div>
							<div className="col-lg-6 col-md-8 no-pd">
								<div className="main-ws-sec">
									<Post 
									pid={this.state.userData.picture}
									/>
									<div className="posts-section">
										<div className="post-bar">
											<div className="post_topbar">
												<div className="usy-dt">
													<img src="images/resources/us-pic.png" alt=""/>
													<div className="usy-name">
														<h3>John Doe</h3>
														<span><img src="images/clock.png" alt=""/>3 min ago</span>
													</div>
												</div>
												<div className="ed-opts">
													<a href="#" title="" className="ed-opts-open"><i className="la la-ellipsis-v"></i></a>
													<ul className="ed-options">
														<li><a href="#" title="">Edit Post</a></li>
														<li><a href="#" title="">Unsaved</a></li>
														<li><a href="#" title="">Unbid</a></li>
														<li><a href="#" title="">Close</a></li>
														<li><a href="#" title="">Hide</a></li>
													</ul>
												</div>
											</div>
											<div className="epi-sec">
												<ul className="descp">
													<li><img src="images/icon8.png" alt=""/><span>Epic Coder</span></li>
													<li><img src="images/icon9.png" alt=""/><span>India</span></li>
												</ul>
												<ul className="bk-links">
													<li><a href="#" title=""><i className="la la-bookmark"></i></a></li>
													<li><a href="#" title=""><i className="la la-envelope"></i></a></li>
												</ul>
											</div>
											<div className="job_descp">
												<h3>Senior Wordpress Developer</h3>
												<ul className="job-dt">
													<li><a href="#" title="">Full Time</a></li>
													<li><span>$30 / hr</span></li>
												</ul>
												<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam luctus hendrerit metus, ut ullamcorper quam finibus at. Etiam id magna sit amet... <a href="#" title="">view more</a></p>
												<ul className="skill-tags">
													<li><a href="#" title="">HTML</a></li>
													<li><a href="#" title="">PHP</a></li>
													<li><a href="#" title="">CSS</a></li>
													<li><a href="#" title="">Javascript</a></li>
													<li><a href="#" title="">Wordpress</a></li> 	
												</ul>
											</div>
											<div className="job-status-bar">
												<ul className="like-com">
													<li>
														<a href="#"><i className="fas fa-heart"></i> Like</a>
														<img src="images/liked-img.png" alt=""/>
														<span>25</span>
													</li> 
													<li><a href="#" className="com"><i className="fas fa-comment-alt"></i> Comment 15</a></li>
												</ul>
												<a href="#"><i className="fas fa-eye"></i>Views 50</a>
											</div>
										</div>
										<TopProfiles />
										<div className="post-bar">
											<div className="post_topbar">
												<div className="usy-dt">
													<img src="images/resources/us-pic.png" alt=""/>
													<div className="usy-name">
														<h3>John Doe</h3>
														<span><img src="images/clock.png" alt=""/>3 min ago</span>
													</div>
												</div>
												<div className="ed-opts">
													<a href="#" title="" className="ed-opts-open"><i className="la la-ellipsis-v"></i></a>
													<ul className="ed-options">
														<li><a href="#" title="">Edit Post</a></li>
														<li><a href="#" title="">Unsaved</a></li>
														<li><a href="#" title="">Unbid</a></li>
														<li><a href="#" title="">Close</a></li>
														<li><a href="#" title="">Hide</a></li>
													</ul>
												</div>
											</div>
											<div className="epi-sec">
												<ul className="descp">
													<li><img src="images/icon8.png" alt=""/><span>Epic Coder</span></li>
													<li><img src="images/icon9.png" alt=""/><span>India</span></li>
												</ul>
												<ul className="bk-links">
													<li><a href="#" title=""><i className="la la-bookmark"></i></a></li>
													<li><a href="#" title=""><i className="la la-envelope"></i></a></li>
													<li><a href="#" title="" className="bid_now">Bid Now</a></li>
												</ul>
											</div>
											<div className="job_descp">
												<h3>Senior Wordpress Developer</h3>
												<ul className="job-dt">
													<li><a href="#" title="">Full Time</a></li>
													<li><span>$30 / hr</span></li>
												</ul>
												<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam luctus hendrerit metus, ut ullamcorper quam finibus at. Etiam id magna sit amet... <a href="#" title="">view more</a></p>
												<ul className="skill-tags">
													<li><a href="#" title="">HTML</a></li>
													<li><a href="#" title="">PHP</a></li>
													<li><a href="#" title="">CSS</a></li>
													<li><a href="#" title="">Javascript</a></li>
													<li><a href="#" title="">Wordpress</a></li> 	
												</ul>
											</div>
											<div className="job-status-bar">
												<ul className="like-com">
													<li>
														<a href="#"><i className="fas fa-heart"></i> Like</a>
														<img src="images/liked-img.png" alt=""/>
														<span>25</span>
													</li> 
													<li><a href="#" className="com"><i className="fas fa-comment-alt"></i> Comment 15</a></li>
												</ul>
												<a href="#"><i className="fas fa-eye"></i>Views 50</a>
											</div>
										</div>
										<div className="posty">
											<div className="post-bar no-margin">
												<div className="post_topbar">
													<div className="usy-dt">
														<img src="images/resources/us-pc2.png" alt=""/>
														<div className="usy-name">
															<h3>John Doe</h3>
															<span><img src="images/clock.png" alt=""/>3 min ago</span>
														</div>
													</div>
													<div className="ed-opts">
														<a href="#" title="" className="ed-opts-open"><i className="la la-ellipsis-v"></i></a>
														<ul className="ed-options">
															<li><a href="#" title="">Edit Post</a></li>
															<li><a href="#" title="">Unsaved</a></li>
															<li><a href="#" title="">Unbid</a></li>
															<li><a href="#" title="">Close</a></li>
															<li><a href="#" title="">Hide</a></li>
														</ul>
													</div>
												</div>
												<div className="epi-sec">
													<ul className="descp">
														<li><img src="images/icon8.png" alt=""/><span>Epic Coder</span></li>
														<li><img src="images/icon9.png" alt=""/><span>India</span></li>
													</ul>
													<ul className="bk-links">
														<li><a href="#" title=""><i className="la la-bookmark"></i></a></li>
														<li><a href="#" title=""><i className="la la-envelope"></i></a></li>
													</ul>
												</div>
												<div className="job_descp">
													<h3>Senior Wordpress Developer</h3>
													<ul className="job-dt">
														<li><a href="#" title="">Full Time</a></li>
														<li><span>$30 / hr</span></li>
													</ul>
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam luctus hendrerit metus, ut ullamcorper quam finibus at. Etiam id magna sit amet... <a href="#" title="">view more</a></p>
													<ul className="skill-tags">
														<li><a href="#" title="">HTML</a></li>
														<li><a href="#" title="">PHP</a></li>
														<li><a href="#" title="">CSS</a></li>
														<li><a href="#" title="">Javascript</a></li>
														<li><a href="#" title="">Wordpress</a></li> 	
													</ul>
												</div>
												<div className="job-status-bar">
													<ul className="like-com">
														<li>
															<a href="#"><i className="fas fa-heart"></i> Like</a>
															<img src="images/liked-img.png" alt=""/>
															<span>25</span>
														</li> 
														<li><a href="#" className="com"><i className="fas fa-comment-alt"></i> Comment 15</a></li>
													</ul>
													<a href="#"><i className="fas fa-eye"></i>Views 50</a>
												</div>
											</div>
											<div className="comment-section">
												<a href="#" className="plus-ic">
													<i className="la la-plus"></i>
												</a>
												<div className="comment-sec">
													<ul>
														<li>
															<div className="comment-list">
																<div className="bg-img">
																	<img src="images/resources/bg-img1.png" alt=""/>
																</div>
																<div className="comment">
																	<h3>John Doe</h3>
																	<span><img src="images/clock.png" alt=""/> 3 min ago</span>
																	<p>Lorem ipsum dolor sit amet, </p>
																	<a href="#" title="" className="active"><i className="fa fa-reply-all"></i>Reply</a>
																</div>
															</div>
															<ul>
																<li>
																	<div className="comment-list">
																		<div className="bg-img">
																			<img src="images/resources/bg-img2.png" alt=""/>
																		</div>
																		<div className="comment">
																			<h3>John Doe</h3>
																			<span><img src="images/clock.png" alt=""/> 3 min ago</span>
																			<p>Hi John </p>
																			<a href="#" title=""><i className="fa fa-reply-all"></i>Reply</a>
																		</div>
																	</div>
																</li>
															</ul>
														</li>
														<li>
															<div className="comment-list">
																<div className="bg-img">
																	<img src="images/resources/bg-img3.png" alt=""/>
																</div>
																<div className="comment">
																	<h3>John Doe</h3>
																	<span><img src="images/clock.png" alt=""/> 3 min ago</span>
																	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam luctus hendrerit metus, ut ullamcorper quam finibus at.</p>
																	<a href="#" title=""><i className="fa fa-reply-all"></i>Reply</a>
																</div>
															</div>
														</li>
													</ul>
												</div>
												<div className="post-comment">
													<div className="cm_img">
														<img src="images/resources/bg-img4.png" alt=""/>
													</div>
													<div className="comment_box">
														<form>
															<input type="text" placeholder="Post a comment" />
															<button type="submit">Send</button>
														</form>
													</div>
												</div>
											</div>
										</div>
										<div className="process-comm">
											<div className="spinner">
												<div className="bounce1"></div>
												<div className="bounce2"></div>
												<div className="bounce3"></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-3 pd-right-none no-pd">
								<div className="right-sidebar">
									<TopPosts />

									<MostViewed /> 
									
									<MostViewedPeople
									 uid={this.state.userData.id}
									 />
								</div>
							</div>
						</div>
					</div>
				</div> 
			</div>
		</main>




		<VibeMapView />

		<PostContent />

	</div>
    );
  }
}
