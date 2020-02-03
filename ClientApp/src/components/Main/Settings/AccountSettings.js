import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Avatar from 'react-avatar-edit';
import Cookies from 'universal-cookie';
import axios from 'axios';
import Swal from 'sweetalert2';



import { NavBar } from '../Body/NavBar';
import Axios from 'axios';



export class AccountSettings extends Component {
    static displayName = AccountSettings.name;


    constructor(props) {
        super(props);


        this.state = {
            preview: null,
            src: null,
            userData: null,
            settingsData: null,
            bio: null,
        }

        this.cookie = new Cookies();

        this.onCrop = this.onCrop.bind(this);
        this.onClose = this.onClose.bind(this);
        this.adjustSwitchs = this.adjustSwitchs.bind(this);
        this.accountSettingHandler = this.accountSettingHandler.bind(this);
        this.fetchBioData = this.fetchBioData.bind(this);
        this.bioandNameHandler = this.bioandNameHandler.bind(this);
        this.profilePictureHandler = this.profilePictureHandler.bind(this);
        this.passwdHandler = this.passwdHandler.bind(this);
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


  componentWillMount() {
    // get cookie
    this.setState({
      userData: this.cookie.get("vibe_cookies")
    }, () => {
      this.fetchSettingsData(this.adjustSwitchs);
      this.fetchBioData();
    });
   }


   // stackoverflow fix
   urltoFile(url, filename, mimeType){
    mimeType = mimeType || (url.match(/^data:([^;]+);/)||'')[1];
    return (fetch(url)
        .then(function(res){return res.arrayBuffer();})
        .then(function(buf){return new File([buf], filename, {type:mimeType});})
    );
}




   fetchSettingsData(cb) {
      fetch('/api/Settings/get/' + this.state.userData.id)
      .then(result => result.json())
      .then(result => {
          this.setState({
              settingsData: result
          });


          // callback 
          cb();
      });
   }


   fetchBioData() {
     fetch('/api/Bio/get/' + this.state.userData.id)
          .then(result => result.json())
          .then(result => {
            this.setState({
              bio: result
            });

          });
   }



   adjustSwitchs() {
     // stupid js

     document.getElementById("hide_profile_picture").checked = this.state.settingsData.hideProfilePicture;
     document.getElementById("notification_mute").checked = this.state.settingsData.notificationShow;
     document.getElementById("notification_sound").checked = this.state.settingsData.notificationSound;
     document.getElementById("show_bio").checked = this.state.settingsData.showBio;
     document.getElementById("notification_email").checked = this.state.settingsData.notificationEmail;
     document.getElementById("chat_sound").checked = this.state.settingsData.chatSound;
   }



   accountSettingHandler(event) {
    // disable page reload
    event.preventDefault();

    const switchs = [
       "hide_profile_picture",
       "notification_mute",
       "notification_sound",
       "show_bio",
       "notification_email",
       "chat_sound"
     ];

     let accSettingsFormData = new FormData();

     


     for (var i = 0; i < switchs.length; i++) {
       let switchVal = (!document.getElementById(switchs[i]).checked) ? 0 : 1;

       accSettingsFormData.set(switchs[i], switchVal);
     }

     // set the userId
     accSettingsFormData.set("userID", this.state.userData.id);

     // send data
     axios({
       method: 'POST',
       url: '/api/Settings/save',
       data: accSettingsFormData,
       headers: {'Content-Type': 'multipart/form-data'}
     }).then((resp) => {
       if (resp.data == 1) {
          alertify.success("Setting saved!");
       } else {
         alertify.error("Error while saving your Settings!");
       }
     }).catch((err) => {
       alertify.error("Error while saving settings: " + err);
     });

   }

   bioandNameHandler(event) {
     // disable page reload
    event.preventDefault();
    let bioValue = $('#userBio').val();
    let nameValue = $("#userFirstName").val();

    if (bioValue !== this.state.bio.bio || nameValue !== this.state.userData.fullname) {
      
      if (bioValue != this.state.bio.bio) {
        axios({
          method: 'POST',
          url: '/api/Bio/update/' + this.state.userData.id + '/' + bioValue,
        }).then((resp) => {
          if (resp.data == 1)
            alertify.success("Bio Changed!");
          else
            alertify.error("Error while saving your bio!");
        }).catch((err) => {
          alertify.error("Error : " + err);
        });
      } else {
        
        axios({
          method: 'POST',
          url: '/api/ProfileInfo/update/' + this.state.userData.id + '/' + nameValue,
        }).then((resp) => {
          if (resp.data == 1) {
            alertify.success("Name Changed!");

            // update cookie
            this.state.userData.fullname = nameValue;
            this.cookie.set("vibe_cookies", this.state.userData);
          }
          else
            alertify.error("Error while saving your Name!");
        }).catch((err) => {
          alertify.error("Error : " + err);
        });

      }
      
    } else {
      alertify.warning("No Changes!");
    }
    
   }

   profilePictureHandler(event) {
      // disable page reload
      event.preventDefault();
      let data = new  FormData();


      this.urltoFile(this.state.preview, "black.jpg").then((file) => {
        // set data
        data.set("files", file, file.name);

        // send image
        axios({
          method: 'POST',
          url: '/api/ProfilePictureUpload/' + this.state.userData.id,
          data: data,
          headers: {
            'Content-Type': 'multipart/form-data',
            'Content-Disposition': 'form-data; name="image"; filename="image.jpg"'
          },
        }).then((resp) => {
          if (resp.data.count > 0) {
            alertify.success("Profile Picture updated");
            // update cookie
            this.state.userData.picture = resp.data.id;
            this.cookie.set("vibe_cookies", this.state.userData);
          } else {
            alertify.error("Error while updating your profile picture")
          }
          console.log("Upload resp: ", resp);
        }).catch((err) => {
          alertify.error("Error while updating your profile picture: " + err);
        });

      });

      

   }


   passwdHandler(event) {
     console.log("passwdHandler");
     // disable page reload
     event.preventDefault();
     let oldPasswd = $("#old-password").val();
     let passwd1 = $("#new-password").val();
     let passwd2 = $("#repeat-password").val();

     console.log("passwd1: " + passwd1 + " passwd2: " + passwd2);
    
     if (passwd1 == passwd2) {

      axios({
        method: 'POST',
        url: '/api/passwd/change/' + this.state.userData.id + "/" + oldPasswd + "/" + passwd1,
      }).then((resp) => {
        if (resp.data == 1) {
          alertify.success("Password Changed!");

          // reset
          $("#old-password").val("");
          $("#new-password").val("");
          $("#repeat-password").val("");
        }
        else
          alertify.error("Error while changing your password!");
      }).catch((err) => {
        alertify.error("Error : " + err);
      });

     } else {
       // Alert
       Swal.fire({
        title: '<b>Password Change</b>',
        text: "Password don't match.",
        icon: 'error',
        showClass: {
            popup: 'animated fadeInDown faster'
        },
        hideClass: {
            popup: 'animated fadeOutUp faster'
        }
      });
     }
   }

    
    render() {
        return (
            <div>
            <header>
			<div className="container">
				<NavBar 
				uid={this.state.userData.id}
				/>
			</div>
		    </header>	
            <section className="profile-account-setting">
            <div className="container">
              <div className="account-tabs-setting">
                <div className="row">
                  <div className="col-lg-3">
                    <div className="acc-leftbar">
                      <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <a className="nav-item nav-link active" id="nav-acc-tab" data-toggle="tab" href="#nav-acc" role="tab" aria-controls="nav-acc" aria-selected="true"><i className="la la-cogs" />Account Setting</a>
                        <a className="nav-item nav-link" id="nav-chngpro-tab" data-toggle="tab" href="#nav-cpro" role="tab" aria-controls="nav-cpro" aria-selected="true"><i className="la la-user" />Change Profile</a>
                        <a className="nav-item nav-link" id="nav-password-tab" data-toggle="tab" href="#nav-password" role="tab" aria-controls="nav-password" aria-selected="false"><i className="fa fa-lock" />Change Password</a>
                        <a className="nav-item nav-link" id="security" data-toggle="tab" href="#security-login" role="tab" aria-controls="security-login" aria-selected="false"><i className="fa fa-user-secret" />Security and Login</a>
                        <a className="nav-item nav-link" id="nav-privacy-tab" data-toggle="tab" href="#privacy" role="tab" aria-controls="privacy" aria-selected="false"><i className="fa fa-paw" />Privacy</a>
                        <a className="nav-item nav-link" id="nav-blockking-tab" data-toggle="tab" href="#blockking" role="tab" aria-controls="blockking" aria-selected="false"><i className="fa fa-cc-diners-club" />Blocking</a>
                        <a className="nav-item nav-link" id="nav-deactivate-tab" data-toggle="tab" href="#nav-deactivate" role="tab" aria-controls="nav-deactivate" aria-selected="false"><i className="fa fa-random" />Deactivate Account</a>
                      </div>
                    </div>{/*acc-leftbar end*/}
                  </div>
                  <div className="col-lg-9">
                    <div className="tab-content" id="nav-tabContent">
                      <div className="tab-pane fade show active" id="nav-acc" role="tabpanel" aria-labelledby="nav-acc-tab">
                        <div className="acc-setting">
                          <h3>Account Setting</h3>
                          <form>
                            <div className="notbar">
                              <h4>Hide Profile Picture</h4>
                              <p>If you Toggle this setting your profile picture will only be shown to you and your friends, and will not be shown to others.</p>
                              <div className="toggle-btn">
                                <div className="custom-control custom-switch">
                                  <input type="checkbox" className="custom-control-input" id="hide_profile_picture" />
                                  <label className="custom-control-label" htmlFor="hide_profile_picture" />
                                </div>
                              </div>
                            </div>{/*notbar end*/}
                            <div className="notbar">
                              <h4>Notification Mute</h4>
                              <p>This option will let you mute all of your notifications.</p>
                              <div className="toggle-btn">
                                <div className="custom-control custom-switch">
                                  <input type="checkbox" className="custom-control-input" id="notification_mute" />
                                  <label className="custom-control-label" htmlFor="notification_mute" />
                                </div>
                              </div>
                            </div>{/*notbar end*/}
                            <div className="notbar">
                              <h4>Notification Sound</h4>
                              <p>This option will mute the notification sound.</p>
                              <div className="toggle-btn">
                                <div className="custom-control custom-switch">
                                  <input type="checkbox" className="custom-control-input" id="notification_sound" />
                                  <label className="custom-control-label" htmlFor="notification_sound" />
                                </div>
                              </div>
                            </div>{/*notbar end*/}
                            <div className="notbar">
                              <h4>Bio</h4>
                              <p>If you Toggle this option your bio will only be shown to you and your friends, and will not be shown to others</p>
                              <div className="toggle-btn">
                                <div className="custom-control custom-switch">
                                  <input type="checkbox" className="custom-control-input" id="show_bio" />
                                  <label className="custom-control-label" htmlFor="show_bio" />
                                </div>
                              </div>
                            </div>{/*notbar end*/}
                            <div className="notbar">
                              <h4>Notification Email</h4>
                              <p>This option allows you to get your notification via email or not.</p>
                              <div className="toggle-btn">
                                <div className="custom-control custom-switch">
                                  <input type="checkbox" className="custom-control-input" id="notification_email" />
                                  <label className="custom-control-label" htmlFor="notification_email" />
                                </div>
                              </div>
                            </div>{/*notbar end*/}
                            <div className="notbar">
                              <h4>Chat sound</h4>
                              <p>To disable the chat sound will chatting.</p>
                              <div className="toggle-btn">
                                <div className="custom-control custom-switch">
                                  <input type="checkbox" className="custom-control-input" id="chat_sound" />
                                  <label className="custom-control-label" htmlFor="chat_sound" />
                                </div>
                              </div>
                            </div>{/*notbar end*/}
                            <div className="save-stngs">
                              <ul>
                                <li><button onClick={this.accountSettingHandler} type="submit">Save Setting</button></li>
                              </ul>
                            </div>{/*save-stngs end*/}
                          </form>
                        </div>{/*acc-setting end*/}
                      </div>
                      
                      <div className="tab-pane fade" id="nav-password" role="tabpanel" aria-labelledby="nav-password-tab">
                        <div className="acc-setting">
                          <h3>Account Setting</h3>
                          <form>
                            <div className="cp-field">
                              <h5>Old Password</h5>
                              <div className="cpp-fiel">
                                <input type="password" id="old-password" name="old-password" placeholder="Old Password" />
                                <i className="fa fa-lock" />
                              </div>
                            </div>
                            <div className="cp-field">
                              <h5>New Password</h5>
                              <div className="cpp-fiel">
                                <input type="password" id="new-password" name="new-password" placeholder="New Password" />
                                <i className="fa fa-lock" />
                              </div>
                            </div>
                            <div className="cp-field">
                              <h5>Repeat Password</h5>
                              <div className="cpp-fiel">
                                <input type="password" id="repeat-password" name="repeat-password" placeholder="Repeat Password" />
                                <i className="fa fa-lock" />
                              </div>
                            </div>
                            <div className="cp-field">
                              <h5><a href="#">Forgot Password?</a></h5>
                            </div>
                            <div className="save-stngs pd2">
                              <ul>
                                <li><button onClick={this.passwdHandler}>Save Setting</button></li>
                              </ul>
                            </div>{/*save-stngs end*/}
                          </form>
                        </div>{/*acc-setting end*/}
                      </div>
                      
                      
                      <div className="tab-pane fade" id="security-login" role="tabpanel" aria-labelledby="security">
                        <div className="privacy security">
                          <div className="row">
                            <div className="col-12">
                              <h3>Security and Login</h3>
                              <hr />
                              <h3>Two - Step Verification</h3>
                              <p>Help protect your account by enabling extra layers of security.</p>
                              <hr />
                              <h3>Security question</h3><i className="la la-edit" />
                              <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Conform your identity with a question only you know the answer to</label>
                              </div>
                              <hr />
                              <h3>Security question</h3>
                              <p>Before can you set a new security question,</p>
                              <hr />
                              <h3>Current Question</h3>
                              <p>Q: Your favorite actor?</p>
                              <br />
                              <h3>New Question</h3>
                              <form>
                                <div className="form-group">
                                  <select className="form-control" id="exampleFormControlSelect1" style={{WebkitAppearance: 'menulist-button'}}>
                                    <option>Please Select New Question</option>
                                    <option>Select Second Queston</option>
                                  </select>
                                </div>
                              </form>                                    
                              <h3>Answer</h3>
                              <form>
                                <div className="form-group">
                                  <input type="text" className="form-control" id="exampleInputPassword1" placeholder=" Answer here" />
                                </div>
                              </form>                                    
                              <div className="checkbox">
                                <div className="form-check">
                                  <div className="custom-control custom-radio">
                                    <input type="radio" id="customRadio1" name="customRadio" className="custom-control-input" />
                                    <label className="custom-control-label" htmlFor="customRadio1">I understand my account will be locked if I am unable to answer this question</label>
                                  </div>                                                                      
                                </div>
                                <div className="form-check">
                                  <div className="custom-control custom-radio">
                                    <input type="radio" id="customRadio2" name="customRadio" className="custom-control-input" />
                                    <label className="custom-control-label" htmlFor="customRadio2">Remember this device</label>
                                  </div>                                                   												  												
                                </div>
                              </div>
                              <hr />
                            </div>
                          </div>
                          <div className="btns">
                            <a href="#">Save</a>
                            <a href="#">Cancel</a>
                          </div>
                        </div> 
                      </div>
                      <div className="tab-pane fade" id="blockking" role="tabpanel" aria-labelledby="nav-blockking-tab">
                        <div className="helpforum">
                          <div className="row">
                            <div className="col-12 security">
                              <h3>Blocking</h3>
                              <hr />
                            </div>
                            <div className="row">
                              <div className="col-12">
                                <h4>Blocking</h4>
                                <p>See your list,and make changes if you'd like</p>
                                <div className="bloktext">
                                  <p>You are not bloking anyone</p>
                                  <p>Need to blok or report someone? Go to the profile of the person you want to blok and select "Blok or Report" from the drowp-down menu at the top of the profile summery</p>
                                  <p>Note: After you have blocked the person, Any previous profile views of yours and of the other person will disappear from each of your "Who's viewed your profile" sections. </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div> 
                      </div>



                      <div className="tab-pane fade" id="nav-cpro" role="tabpanel" aria-labelledby="nav-chngpro-tab">
                        <div className="helpforum">
                          <div className="row">
                            <div className="col-12 security">
                              <h3>Change Profile</h3>
                              <hr />
                            </div>
                            <div className="row">
                              <div className="col-12">
                                <h4>Change Bio / Name</h4>
                                <p>Change your bio or Name so people can know your status and who you are.</p>
                                <div className="bioContainer">
                                    <form>
                                        <div className="form-group">
                                            <input defaultValue={(this.state.bio != null) ? this.state.bio.bio : ''} type="text" className="form-control" id="userBio" placeholder="Bio" />
                                            <br />
                                            <input defaultValue={(this.state.userData != null) ? this.state.userData.fullname : ''} type="text" className="form-control" id="userFirstName" placeholder="Your name..." />
                                            <div className="save-stngs">
                                                <ul>
                                                    <li><button onClick={this.bioandNameHandler}>Save</button></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </form>        
                                </div>
                              </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <h4>Change Profile Picture</h4>
                                    <p>This Setting allows your to change your profile picture</p>

                                    <form>
                                      <div className="pictureContainer">
                                          {(this.state.preview != null) ? <img src={this.state.preview} alt="Preview" /> : '.'}
                                          <Avatar
                                              width={390}
                                              height={295}
                                              onCrop={this.onCrop}
                                              onClose={this.onClose}
                                              src={this.state.src}
                                          />
                                      </div>

                                      <div className="save-stngs">
                                              <ul>
                                                  <li><button type="submit" onClick={this.profilePictureHandler}>Save</button></li>
                                              </ul>
                                      </div>
                                    </form>
                                </div>
                            </div>

                          </div>
                        </div> 
                      </div>	
                    
                      <div className="tab-pane fade" id="privacy" role="tabpanel" aria-labelledby="nav-privacy-tab">
                        <div className="privac">
                          <div className="row">
                            <div className="col-12">
                              <h3>Privacy</h3>
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-12">
                              <div className="dropdown privacydropd">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">Who can see your email address</a>
                                <div className="dropdown-menu">
                                  <p>Choose who can see your email address on your profile</p>
                                  <div className="row">
                                    <div className="col-md-9 col-sm-12">
                                      <form className="radio-form">
                                        <div className="custom-control custom-checkbox">
                                          <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                          <label className="custom-control-label" htmlFor="customCheck1">Everyone</label>
                                        </div>
                                        <div className="custom-control custom-checkbox">
                                          <input type="checkbox" className="custom-control-input" id="customCheck2" />
                                          <label className="custom-control-label" htmlFor="customCheck2">Friends</label>
                                        </div>
                                        <div className="custom-control custom-checkbox">
                                          <input type="checkbox" className="custom-control-input" id="customCheck3" />
                                          <label className="custom-control-label" htmlFor="customCheck3">Only Me</label>
                                        </div>
                                      </form>
                                    </div>
                                    <div className="col-md-3 col-sm-12">
                                      <p style={{float: 'right'}}>Everyone</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-12">
                              <div className="dropdown privacydropd">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">Who can see your Friends</a>
                                <div className="dropdown-menu">
                                  <p>Choose who can see your list of connections</p>
                                  <div className="row">
                                    <div className="col-md-9 col-sm-12">
                                      <form className="radio-form">
                                        <div className="custom-control custom-checkbox">
                                          <input type="checkbox" className="custom-control-input" id="customCheck4" />
                                          <label className="custom-control-label" htmlFor="customCheck4">Everyone</label>
                                        </div>
                                        <div className="custom-control custom-checkbox">
                                          <input type="checkbox" className="custom-control-input" id="customCheck5" />
                                          <label className="custom-control-label" htmlFor="customCheck5">Friends</label>
                                        </div>
                                        <div className="custom-control custom-checkbox">
                                          <input type="checkbox" className="custom-control-input" id="customCheck6" />
                                          <label className="custom-control-label" htmlFor="customCheck6">Only Me</label>
                                        </div>
                                      </form>
                                    </div>
                                    <div className="col-md-3 col-sm-12">
                                      <p style={{float: 'right'}}>Everyone</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-12">
                              <div className="dropdown privacydropd">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">Manage who can discover your profile from your email address</a>
                                <div className="dropdown-menu">
                                  <p>Choose who can discover your profile if they are not connected to you but have your email address</p>
                                  <div className="row">
                                    <div className="col-md-9 col-sm-12">
                                      <form className="radio-form">
                                        <div className="custom-control custom-checkbox">
                                          <input type="checkbox" className="custom-control-input" id="customCheck7" />
                                          <label className="custom-control-label" htmlFor="customCheck7">Everyone</label>
                                        </div>
                                        <div className="custom-control custom-checkbox">
                                          <input type="checkbox" className="custom-control-input" id="customCheck8" />
                                          <label className="custom-control-label" htmlFor="customCheck8">Friends</label>
                                        </div>
                                        <div className="custom-control custom-checkbox">
                                          <input type="checkbox" className="custom-control-input" id="customCheck9" />
                                          <label className="custom-control-label" htmlFor="customCheck9">Only Me</label>
                                        </div>
                                      </form>
                                    </div>
                                    <div className="col-md-3 col-sm-12">
                                      <p style={{float: 'right'}}>Everyone</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-12">
                              <div className="dropdown privacydropd">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">Search history</a>
                                <div className="dropdown-menu">
                                  <p>Clear all previous searches performed on LinkedIn</p>
                                  <div className="row">
                                    <div className="col-12">
                                      <form className="radio-form">
                                        <div className="custom-control custom-checkbox">
                                          <input type="checkbox" className="custom-control-input" id="customCheck10" />
                                          <label className="custom-control-label" htmlFor="customCheck10">Clear All History</label>
                                        </div>															
                                      </form>
                                      <div className="privabtns">
                                        <a href="#">Clear All History</a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-12">
                              <div className="dropdown privacydropd">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">Sharing your profile when you click apply</a>
                                <div className="dropdown-menu">
                                  <p>Chose if you want to share your full profile with the job poster when you're taken off linkedin after clicking apply </p>
                                  <div className="row">
                                    <div className="col-md-9 col-sm-12">
                                      <form className="radio-form">
                                        <div className="custom-control custom-radio">
                                          <input type="radio" id="customRadio5" name="customRadio" className="custom-control-input" />
                                          <label className="custom-control-label" htmlFor="customRadio5">Yes</label>
                                        </div>
                                        <div className="custom-control custom-radio">
                                          <input type="radio" id="customRadio6" name="customRadio" className="custom-control-input" />
                                          <label className="custom-control-label" htmlFor="customRadio6">Yes</label>
                                        </div>
                                      </form>
                                    </div>
                                    <div className="col-md-3 col-sm-12">
                                      <p style={{float: 'right'}}>Yes</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-12">
                              <div className="privabtns">
                                <a href="#">Save</a>
                                <a href="#">Cancel</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="nav-deactivate" role="tabpanel" aria-labelledby="nav-deactivate-tab">
                        <div className="acc-setting">
                          <h3>Deactivate Account</h3>
                          <form>
                            <div className="cp-field">
                              <h5>Email</h5>
                              <div className="cpp-fiel">
                                <input type="text" name="email" placeholder="Email" />
                                <i className="fa fa-envelope" />
                              </div>
                            </div>
                            <div className="cp-field">
                              <h5>Password</h5>
                              <div className="cpp-fiel">
                                <input type="password" name="password" placeholder="Password" />
                                <i className="fa fa-lock" />
                              </div>
                            </div>
                            <div className="cp-field">
                              <h5>Please Explain Further</h5>
                              <textarea defaultValue={""} />
                            </div>
                            <div className="cp-field">
                              <div className="fgt-sec">
                                <input type="checkbox" name="cc" id="c4" />
                                <label htmlFor="c4">
                                  <span />
                                </label>
                                <small>Email option out</small>
                              </div>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pretium nulla quis erat dapibus, varius hendrerit neque suscipit. Integer in ex euismod, posuere lectus id,</p>
                            </div>
                            <div className="save-stngs pd3">
                              <ul>
                                <li><button type="submit">Save Setting</button></li>
                              </ul>
                            </div>{/*save-stngs end*/}
                          </form>
                        </div>{/*acc-setting end*/}
                      </div>
                    </div>
                  </div>
                </div>
              </div>{/*account-tabs-setting end*/}
            </div>
          </section>
          </div>
        )
    }
}
