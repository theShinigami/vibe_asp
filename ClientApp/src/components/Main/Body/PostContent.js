import React, { Component } from 'react';
import axios from 'axios';

export class PostContent extends Component {
    static displayName = PostContent.name;
	
	
	constructor(props) {
		super(props);

		this.state = {

		}


		this.postDataHandler = this.postDataHandler.bind(this);
	}



	postDataHandler(event) {
		// prevent page from reloading...
		event.preventDefault();

		let data = new FormData(event.target);

		data.set("uid", this.props.uid);

		axios({
            method: 'POST',
			url: '/api/Post',
			data: data,
			headers: {'Content-Type': 'multipart/form-data'}
          }).then((resp) => {
            if (resp.data == 1) {
				alertify.success("Posted!");
				
				$(".post-popup.job_post").removeClass("active");
				$(".wrapper").removeClass("overlay");
            }
            else
              alertify.error("Error while posting your content!");
          }).catch((err) => {
            alertify.error("Error : " + err);
          });

	}




    closePopup(event) {
        $(".post-popup.job_post").removeClass("active");
        $(".wrapper").removeClass("overlay");
    }


    render() {
        return (
            <div className="post-popup job_post">
			<div className="post-project">
				<h3>Post</h3>
				<div className="post-project-fields">
					<form onSubmit={this.postDataHandler}>
						<div className="row">
							<div className="col-lg-12">
								<input type="text" name="title" placeholder="Title" />
							</div>
							<div className="col-lg-12">
								<textarea name="description" placeholder="Description"></textarea>
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
