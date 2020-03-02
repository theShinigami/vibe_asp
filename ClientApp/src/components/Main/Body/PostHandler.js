import React, { Component } from 'react';
import { TopProfiles } from './TopProfiles';
import axios from 'axios';


export class PostHandler extends Component {
    static displayName = PostHandler.name

    constructor() {
        super();


        this.state = {
            posts: null,
            tags: <p>Loading...</p>
        }

        this.fetchTopPost = this.fetchTopPost.bind(this);
        this.buildTag = this.buildTag.bind(this);
        this.likeHandler = this.likeHandler.bind(this);
    
    }


    componentDidMount() {
        this.fetchTopPost(() => {
            this.buildTag();
        });
    }


    fetchTopPost(cb) {
        fetch('/api/Post/getTop' )
            .then(result => result.json())
            .then(result => {
                this.setState({
                    posts: result.reverse()
                });

                // callback...
                cb();
            });
    }

    likeHandler(event) {
        // prevent page from reloading
        event.preventDefault();

        console.log("Id: ", event.target.id.substring(7));
        axios({
            method: 'POST',
			url: '/api/Like/' + event.target.id.substring(7) +'/' + this.props.uid,
          }).then((resp) => {
            if (resp.data == 1) {
				alertify.success("Liked!");
            }
            else
              alertify.error("Unlike!");

            this.forceUpdate();
          }).catch((err) => {
            alertify.error("Error : " + err);
          });
    }

    async fetchImage(id) {
        // await fetch('/api/ProfilePicture/getImage/' + id)
        //     .then(result => result.json())
        //     .then(result => {
        //         return result.picLocation;
        //     });
        
            const resp = await fetch('/api/ProfilePicture/getImage/' + id);
            const data = await resp.json();
            return data.picLocation;
    }


    buildTag() {
        let posts = [];

        for (let i = 0; i < this.state.posts.length; i++) {
            let imgTag = null;
            if (this.state.posts[i].imgId != -1) {
                // let img = this.fetchImage(this.state.posts[i].imgId);
                // img.then((d) => {
                //     console.log(d)
                // })
                imgTag = <img src="/Uploads/Post/wallimage1.jpg" width="200" height="200" />;
            }
            posts.push(
                <div key={"main_post_content_" + i} className="post-bar">
                    <div className="post_topbar">
                        <div className="usy-dt">
                            <img width="40" height="40" src={this.state.posts[i].posterPicture} alt=""/>
                            <div className="usy-name">
                                <h3>{this.state.posts[i].fullname}</h3>
                                <span><img src="images/clock.png" alt=""/>{this.state.posts[i].createdAt}</span>
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
                            <li><img src="images/icon9.png" alt=""/><span>{this.state.posts[i].country}</span></li>
                        </ul>
                        <ul className="bk-links">
                            <li><a href="#" title=""><i className="la la-bookmark"></i></a></li>
                            <li><a href="#" title=""><i className="la la-envelope"></i></a></li>
                        </ul>
                    </div>
                    <div className="job_descp">
                        <h3>{this.state.posts[i].title}</h3>

                        <ul className="job-dt">
                            <li><a href="#" title="">Full Time</a></li>
                            <li><span>${this.state.posts[i].payment} / hr</span></li>
                        </ul>
                
                        <p>{this.state.posts[i].caption} <a href="#" title="">view more</a></p>
                    </div>

                    {(imgTag != null) ? imgTag : ''}

                    <div className="job-status-bar">
                        <ul className="like-com">
                            <li>
                                <a id={"postid_" + this.state.posts[i].id} onClick={this.likeHandler} href="#"><i className="fas fa-heart"></i> Like</a>
                                <img src="images/liked-img.png" alt=""/>
                                <span>{this.state.posts[i].like}</span>
                            </li> 
                            <li><a href="#" className="com"><i className="fas fa-comment-alt"></i> Comment 15</a></li>
                        </ul>
                    </div>
                </div>

            );
        }

        this.setState({
            tags: posts
        });

    }









    
    render() {
        return (
            <div>
                {this.state.tags}
                <div className="top-profiles">
                    <div className="pf-hd">
                        <h3>Top Profiles</h3>
                        <i className="la la-ellipsis-v"></i>
                    </div>

                    <TopProfiles />
                
                </div>
                
                
            </div>
        )
    }
}
