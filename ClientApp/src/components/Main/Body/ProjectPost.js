import React, { Component } from 'react'
// import L from 'leaflet';


export class ProjectPost extends Component {
    static displayName = ProjectPost.name;

    constructor(props) {
        super(props);

        this.state = {

        };

        this.projectPostHandler = this.projectPostHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }


    projectPostHandler(event) {
        // prevent page from reloading
        event.preventDefault();


    }

    onChangeHandler(event) {
        console.log(event.target.files[0]);
    }

    
    render() {

        return (
            <div className="post-popup pst-pj">
                <div className="post-project">
                    <h3>Project Post</h3>
                    <div className="post-project-fields">
                        <form onSubmit={this.projectPostHandler}>
                            <div className="row">
                                <div className="col-lg-12">
                                    <input type="text" name="title" placeholder="Title" />
                                </div>
                                <div className="col-lg-12">
                                    <textarea name="description" placeholder="Description"></textarea>
                                </div>
                                <div className="col-lg-12">
                                    <input type="file" name="file" onChange={this.onChangeHandler} />
                                </div>
                                <div className="col-lg-12">
                                    <ul>
                                        <li><button className="active" type="submit" value="post">Post</button></li>
                                        <li><a onClick={e => { e.preventDefault(); this.closePopup()}} title="">Cancel</a></li>
                                    </ul>
                                </div>
                            </div>
                        </form>
                    </div>
                    <a href="#" title=""><i className="la la-times-circle-o"></i></a>
                </div>
		    </div>
        )
    }
}
