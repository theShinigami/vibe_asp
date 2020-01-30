import React, { Component } from 'react'

export class TopPosts extends Component {
    static displayName = TopPosts.name;

    render() {
        return (
            <div className="widget widget-jobs">
                <div className="sd-title">
                    <h3>Top Posts</h3>
                    <i className="la la-ellipsis-v"></i>
                </div>
                <div className="jobs-list">
                    <div className="job-info">
                        <div className="job-details">
                            <h3>Senior Product Designer</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
                        </div>
                    </div>
                    <div className="job-info">
                        <div className="job-details">
                            <h3>Senior UI / UX Designer</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
                        </div>
                    </div>
                    <div className="job-info">
                        <div className="job-details">
                            <h3>Junior Seo Designer</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
                        </div>
                    </div>
                    <div className="job-info">
                        <div className="job-details">
                            <h3>Senior PHP Designer</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
                        </div>
                    </div>
                    <div className="job-info">
                        <div className="job-details">
                            <h3>Senior Developer Designer</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
                        </div>
                    </div>
                </div>
			</div>
        )
    }
}
