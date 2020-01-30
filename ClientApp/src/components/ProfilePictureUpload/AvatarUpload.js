import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Avatar from 'react-avatar-edit';


export class AvatarUpload extends Component {
  static displayName = AvatarUpload.name;

  constructor(props) {
      super(props);

      const src = './home/sal/Projects/Vibe/ClientApp/src/components/ProfilePictureUpload/rick.jpeg';
      this.state = {
          preview: null,
          src
      }

      this.onCrop = this.onCrop.bind(this);
      this.onClose = this.onClose.bind(this);
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
      console.log(preview);
  }


  render () {
    return (
        <div>

            <div id="avatar_bio">
                <h3>Avatar and Bio</h3>
                <img style={{float: "right", position: "absolute", top: "90px", right: "50px", width: "85px"}} src={this.state.preview} alt="Preview" />   
            </div> {/**  end of avatar_bio */}

            <Avatar
                width={310}
                height={200}
                onCrop={this.onCrop}
                onClose={this.onClose}
            />


        </div>
    );
  }
}
