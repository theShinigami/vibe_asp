import React, { Component } from 'react';
import Swal from 'sweetalert2';
import ReactDOM from 'react-dom';
import Avatar from 'react-avatar-edit';


export class Profile extends Component {
    static displayName = Profile.name;

    constructor(props) {
        super(props);

        this.state = {
            profileData: null,
            bioData: null,
            fnfData: null,
            preview: null,
            src: null,
        }


        this.onClose = this.onClose.bind(this);
        this.onCrop = this.onCrop.bind(this);
    }

    componentWillMount() {
        // get profile
       this.fetchProfile();
       // get bioData
       this.fetchBio();
       // get fnfData
       this.fetchFnF();
    }


    onClose() {
        this.setState({
            preview: null
        });
    }

    onCrop(preview) {
        this.setState({
            preview: preview
        });
    }

  
  
    fetchProfile() {
        fetch('/api/ProfilePicture/get/' + this.props.picId)
                .then(result => result.json())
                .then(result => {
                    this.setState({
                        profileData: result
                    });
                });
    }

    
    fetchBio() {
        fetch('/api/Bio/get/' + this.props.id)
            .then(result => result.json())
            .then(result => {
                this.setState({
                    bioData: result
                });
            });
    }

    fetchFnF() {
        fetch('/api/fnf/get/' + this.props.id)
            .then(result => result.json())
            .then(result => {
                this.setState({
                    fnfData: result
                });
            });
    }


    handleViewProfile(event) {
        event.preventDefault();

    }

    render() {
        return (
            <div className="user-data full-width">
                
                <div className="user-profile">
                    <div className="username-dt">
                        <div className="usr-pic">
                            <img src={(this.state.profileData != null) ? this.state.profileData.pictureLocation : '.'} alt="" />
                        </div>
                    </div>
                    <div className="user-specs">
                        <h3>{this.props.fullname}</h3>
                        <span>{(this.state.bioData != null) ? this.state.bioData.bio : '-'}</span>
                    </div>
                </div>
                <ul className="user-fw-status">
                    <li>
                        <h4>Following</h4>
                        <span>{(this.state.fnfData != null) ? this.state.fnfData.following : '-'}</span>
                    </li>
                    <li>
                        <h4>Followers</h4>
                        <span>{(this.state.fnfData != null) ? this.state.fnfData.followers : '-'}</span>
                    </li>
                    <li>
                        <a onClick={this.handleViewProfile} title="">View Profile</a>
                    </li>
                </ul>
			</div>
        )
    }
}
