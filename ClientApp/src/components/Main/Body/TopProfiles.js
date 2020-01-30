import React, { Component } from 'react';

export class TopProfiles extends Component {
    static displayName = TopProfiles.name;
    
    constructor() {
        super();

        this.state = {
            topData: null,
            topItem: null,
            topLoadingTag: this.suggLoadingTag()
        }
    }


    componentWillMount() {
        // get suggestion
        // and build tag
        this.fetchTopProfiles(() => {
            this.buildTopTag();
        });
    }


    fetchTopProfiles(cb) {

        fetch('/api/TopProfile/')
                .then(result => result.json())
                .then(result => {
                    this.setState({
                        topData: result
                    });

                    // callback
                    cb();
                });

    }


    buildTopTag() {
        let top = [];

        for (let i = 0; i < this.state.topData.length; i++) {
            top.push(
                <div key={"topProfile_" + i} className="user-profy">
                    <img width="50" height="50" src={this.state.topData[i].picture} alt=""/>
                    <h3>{this.state.topData[i].fullName}</h3>
                    <span>{this.state.topData[i].country}</span>
                    <ul>
                        <li><a href="#" title="" className="followw">Follow</a></li>
                    </ul>
                    <a href="#" title="">View Profile</a>
                </div>
            );
        }

        // change the suggItem state so we can get the result
        this.setState({
            topItem: top
        });
    }

    suggLoadingTag() {
        return (
            <div className="user-profy">
                <h3>Loading...</h3>
            </div>

        )
    }
    
    render() {
        return (
            <div className="top-profiles">
                    <div className="pf-hd">
                        <h3>Top Profiles</h3>
                        <i className="la la-ellipsis-v"></i>
                    </div>
                    <div className="profiles-slider">
                        {(this.state.topItem != null) ? this.state.topItem : this.state.topLoadingTag}
                        {/* <div className="user-profy">
                            <img src="images/resources/user1.png" alt=""/>
                            <h3>John Doe</h3>
                            <span>Graphic Designer</span>
                            <ul>
                                <li><a href="#" title="" className="followw">Follow</a></li>
                            </ul>
                            <a href="#" title="">View Profile</a>
                        </div>
                        <div className="user-profy">
                            <img src="images/resources/user2.png" alt=""/>
                            <h3>John Doe</h3>
                            <span>Graphic Designer</span>
                            <ul>
                                <li><a href="#" title="" className="followw">Follow</a></li>
                            </ul>
                            <a href="#" title="">View Profile</a>
                        </div>
                        <div className="user-profy">
                            <img src="images/resources/user3.png" alt=""/>
                            <h3>John Doe</h3>
                            <span>Graphic Designer</span>
                            <ul>
                                <li><a href="#" title="" className="followw">Follow</a></li>
                                <li><a href="#" title="" className="envlp"><img src="images/envelop.png" alt=""/></a></li>
                                <li><a href="#" title="" className="hire">hire</a></li>
                            </ul>
                            <a href="#" title="">View Profile</a>
                        </div>
                        <div className="user-profy">
                            <img src="images/resources/user1.png" alt=""/>
                            <h3>John Doe</h3>
                            <span>Graphic Designer</span>
                            <ul>
                                <li><a href="#" title="" className="followw">Follow</a></li>
                                <li><a href="#" title="" className="envlp"><img src="images/envelop.png" alt=""/></a></li>
                                <li><a href="#" title="" className="hire">hire</a></li>
                            </ul>
                            <a href="#" title="">View Profile</a>
                        </div>
                        <div className="user-profy">
                            <img src="images/resources/user2.png" alt=""/>
                            <h3>John Doe</h3>
                            <span>Graphic Designer</span>
                            <ul>
                                <li><a href="#" title="" className="followw">Follow</a></li>
                                <li><a href="#" title="" className="envlp"><img src="images/envelop.png" alt=""/></a></li>
                                <li><a href="#" title="" className="hire">hire</a></li>
                            </ul>
                            <a href="#" title="">View Profile</a>
                        </div>
                        <div className="user-profy">
                            <img src="images/resources/user3.png" alt=""/>
                            <h3>John Doe</h3>
                            <span>Graphic Designer</span>
                            <ul>
                                <li><a href="#" title="" className="followw">Follow</a></li>
                                <li><a href="#" title="" className="envlp"><img src="images/envelop.png" alt=""/></a></li>
                                <li><a href="#" title="" className="hire">hire</a></li>
                            </ul>
                            <a href="#" title="">View Profile</a>
                        </div> */}
                    </div>
				</div>
        )
    }
}
