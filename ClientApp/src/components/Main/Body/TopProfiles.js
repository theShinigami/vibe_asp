import React, { Component } from 'react';

export class TopProfiles extends Component {
    static displayName = TopProfiles.name;
    
    constructor() {
        super();

        this.state = {
            topData: null,
            topItem: null,
            topLoadingTag: this.suggLoadingTag(),
            buildTag: false,
        }
    }


    componentWillMount() {
        // get suggestion
        this.fetchTopProfiles();
    }


    componentDidUpdate() {
        // build tag

        if (!this.state.buildTag) {
            this.buildTopTag();
            
            // set build tag to true
            this.setState({
                buildTag: true
            });
        }

    }


    fetchTopProfiles() {

        fetch('/api/TopProfile/')
                .then(result => result.json())
                .then(result => {
                    this.setState({
                        topData: result
                    });
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
            <div className="profiles-slider">
                {(this.state.topItem != null) ? this.state.topItem : this.state.topLoadingTag}
            </div>
        )
    }
}
