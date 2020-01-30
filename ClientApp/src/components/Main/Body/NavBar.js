import React, { Component } from 'react'

export  class NavBar extends Component {
    static displayName = NavBar.name;


    constructor() {
        super();

        this.state = {
            userData: null,
            profilePic: null
        }
    }



    componentWillMount() {
        this.fetchUserData(() => {
            this.fetchProfilePic();
        });
    }


    fetchUserData(cb) {
        console.log("Fetching data for id: " + this.props.uid);

        fetch('/api/ProfileInfo/get/' + this.props.uid)
            .then(result => result.json())
            .then(result => {
                this.setState({
                    userData: result
                });

                // callback...
                cb();
            });
    }

    fetchProfilePic() {
        console.log("Checking the id of: ", this.state.userData.picture);
        fetch('/api/ProfilePicture/get/' + this.state.userData.picture)
                .then(result => result.json())
                .then(result => {
                    this.setState({
                        profilePic: result.pictureLocation
                    });
                    console.log("this pic: ", result.pictureLocation);
                });
    }


    
    render() {
        return (
            <div className="header-data">
					<div className="logo">
						<img alt="logo" src="/Pictures/Logo/v-logo.svg" />
					</div>
					<div className="search-bar">
						<form>
							<input type="text" name="search" placeholder="Search..." />
							<button type="submit"><i className="la la-search"></i></button>
						</form>
					</div>
					<nav>
						<ul>
							
							<li>
								<a onClick={e => e.preventDefault()} title="">
									<span><img src="images/icon4.png" alt=""/></span>
									<font color="#ffffff">Profiles</font>
								</a>
								<ul>
									<li><a href="user-profile.html" title="">User Profile</a></li>
									<li><a href="my-profile-feed.html" title="">my-profile-feed</a></li>
								</ul>
							</li>
							<li>
								<a onClick={e => e.preventDefault()} title="" className="not-box-openm">
									<span><img src="images/icon6.png" alt=""/></span>
									<font color="#ffffff">Messages</font>
								</a>
								<div className="notification-box msg" id="message">
									<div className="nt-title">
										<h4>Setting</h4>
										<a href="#" title="">Clear all</a>
									</div>
									<div className="nott-list">
										<div className="notfication-details">
							  				<div className="noty-user-img">
							  					<img src="images/resources/ny-img1.png" alt=""/>
							  				</div>
							  				<div className="notification-info">
							  					<h3><a href="messages.html" title="">Jassica William</a> </h3>
							  					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do.</p>
							  					<span>2 min ago</span>
							  				</div>
						  				</div>
						  				<div className="notfication-details">
							  				<div className="noty-user-img">
							  					<img src="images/resources/ny-img2.png" alt=""/>
							  				</div>
							  				<div className="notification-info">
							  					<h3><a href="messages.html" title="">Jassica William</a></h3>
							  					<p>Lorem ipsum dolor sit amet.</p>
							  					<span>2 min ago</span>
							  				</div>
						  				</div>
						  				<div className="notfication-details">
							  				<div className="noty-user-img">
							  					<img src="images/resources/ny-img3.png" alt=""/>
							  				</div>
							  				<div className="notification-info">
							  					<h3><a href="messages.html" title="">Jassica William</a></h3>
							  					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo incididunt ut labore et dolore magna aliqua.</p>
							  					<span>2 min ago</span>
							  				</div>
						  				</div>
						  				<div className="view-all-nots">
						  					<a href="messages.html" title="">View All Messsages</a>
						  				</div>
									</div>
								</div>
							</li>
							<li>
								<a onClick={e => e.preventDefault()} title="" className="not-box-open">
									<span><img src="images/icon7.png" alt=""/></span>
									<font color="#ffffff">Notification</font>
								</a>
								<div className="notification-box noti" id="notification">
									<div className="nt-title">
										<h4>Setting</h4>
										<a href="#" title="">Clear all</a>
									</div>
									<div className="nott-list">
										<div className="notfication-details">
							  				<div className="noty-user-img">
							  					<img src="images/resources/ny-img1.png" alt=""/>
							  				</div>
							  				<div className="notification-info">
							  					<h3><a href="#" title="">Jassica William</a> Comment on your project.</h3>
							  					<span>2 min ago</span>
							  				</div>
						  				</div>
						  				<div className="notfication-details">
							  				<div className="noty-user-img">
							  					<img src="images/resources/ny-img2.png" alt=""/>
							  				</div>
							  				<div className="notification-info">
							  					<h3><a href="#" title="">Jassica William</a> Comment on your project.</h3>
							  					<span>2 min ago</span>
							  				</div>
						  				</div>
						  				<div className="notfication-details">
							  				<div className="noty-user-img">
							  					<img src="images/resources/ny-img3.png" alt=""/>
							  				</div>
							  				<div className="notification-info">
							  					<h3><a href="#" title="">Jassica William</a> Comment on your project.</h3>
							  					<span>2 min ago</span>
							  				</div>
						  				</div>
						  				<div className="notfication-details">
							  				<div className="noty-user-img">
							  					<img src="images/resources/ny-img2.png" alt=""/>
							  				</div>
							  				<div className="notification-info">
							  					<h3><a href="#" title="">Jassica William</a> Comment on your project.</h3>
							  					<span>2 min ago</span>
							  				</div>
						  				</div>
						  				<div className="view-all-nots">
						  					<a href="#" title="">View All Notification</a>
						  				</div>
									</div>
								</div>
							</li>
						</ul>
					</nav>
					<div className="menu-btn">
						<a href="#" title=""><i className="fa fa-bars"></i></a>
					</div>
					<div className="user-account">
						<div className="user-info">
							<img width="30" height="30" src={(this.state.profilePic != null) ? this.state.profilePic : ''} alt=""/>
								<a onClick={e => e.preventDefault()} title=""><font color="#ffffff">{(this.state.userData != null) ? this.state.userData.username : '.'}</font></a>
							<i className="la la-sort-down"></i>
						</div>
						<div className="user-account-settingss" id="users">
							<h3>Setting</h3>
							<ul className="us-links">
								<li><a href="profile-account-setting.html" title="">Account Setting</a></li>
								<li><a href="#" title="">Privacy</a></li>
								<li><a href="#" title="">Faqs</a></li>
								<li><a href="#" title="">Terms & Conditions</a></li>
							</ul>
							<h3 className="tc"><a href="/logout" title="">Logout</a></h3>
						</div>
					</div>
			</div>
        )
    }
}
