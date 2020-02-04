import React, { Component } from 'react'

export class Post extends Component {
    static displayName = Post.name;

    constructor() {
        super();

        this.state = {
            profilePic: null
        }
    }

    
    componentWillMount() {
        // get profile picture
        this.fetchProfilePicture();
    }


    fetchProfilePicture() {
        fetch('/api/ProfilePicture/get/' + this.props.pid)
                .then(result => result.json())
                .then(result => {
                    this.setState({
                        profilePic: result.pictureLocation
                    });
                });
    }


    render() {
        return (
            <div className="post-topbar">
                <div className="user-picy">
                    <img src={(this.state.profilePic != null) ? this.state.profilePic : ''} alt=""/>
                </div>
                <div className="post-st">
                    <ul>
                        <li><a className="post_project" href="#" title="">Post Project</a></li>
                        <li><a className="post-jb active" href="#" title="">Post</a></li>
                    </ul>
                </div>
			</div>
        )
    }
}
