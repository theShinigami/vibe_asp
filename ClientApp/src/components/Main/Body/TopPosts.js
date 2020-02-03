import React, { Component } from 'react'

export class TopPosts extends Component {
    static displayName = TopPosts.name;



    constructor() {
        super();

        this.state = {
            posts: [],
            tags: <p>Loading...</p>
        }


        this.fetchTopPost = this.fetchTopPost.bind(this);
        this.buildTag = this.buildTag.bind(this);
    }


    componentWillMount() {
        this.fetchTopPost(() => {
            this.buildTag();
        });
    }


    fetchTopPost(cb) {
        fetch('/api/Post/getTop' )
        .then(result => result.json())
        .then(result => {
            this.setState({
                posts: result
            });

            // callback...
            cb();
        });
    }


    buildTag() {
        let posts = [];

        for (let i = 0; i < this.state.posts.length; i++) {
            posts.push(
                <div key={"top_post_" + i} className="job-info">
                    <div className="job-details">
                        <h3>{this.state.posts[i].fullname}</h3>
                        <p>{this.state.posts[i].caption}</p>
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
            <div className="widget widget-jobs">
                <div className="sd-title">
                    <h3>Top Posts</h3>
                    <i className="la la-ellipsis-v"></i>
                </div>
                <div className="jobs-list">
                    {this.state.tags}
                </div>
			</div>
        )
    }
}
