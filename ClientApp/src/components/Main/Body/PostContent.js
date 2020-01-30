import React, { Component } from 'react'

export class PostContent extends Component {
    static displayName = PostContent.name;
    



    closePopup(event) {
        $(".post-popup.job_post").removeClass("active");
        $(".wrapper").removeClass("overlay");
    }


    render() {
        return (
            <div className="post-popup job_post">
			<div className="post-project">
				<h3>Post a job</h3>
				<div className="post-project-fields">
					<form>
						<div className="row">
							<div className="col-lg-12">
								<input type="text" name="title" placeholder="Title" />
							</div>
							<div className="col-lg-12">
								<div className="inp-field">
									<select>
										<option>Category</option>
										<option>Category 1</option>
										<option>Category 2</option>
										<option>Category 3</option>
									</select>
								</div>
							</div>
							<div className="col-lg-12">
								<input type="text" name="skills" placeholder="Skills" />
							</div>
							<div className="col-lg-6">
								<div className="price-br">
									<input type="text" name="price1" placeholder="Price" />
									<i className="la la-dollar"></i>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="inp-field">
									<select>
										<option>Full Time</option>
										<option>Half time</option>
									</select>
								</div>
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
