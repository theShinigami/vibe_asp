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
import { PostHandler } from './Body/PostHandler';



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
import '../../static/css/alertify.css';

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
										<PostHandler 
										uid={this.state.userData.id}
										/>
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

		<PostContent
		uid={this.state.userData.id}
		/>

	</div>
    );
  }
}
