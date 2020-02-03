import React, { Component } from 'react'

export class MostViewedPeople extends Component {
    static displayName = MostViewedPeople.name;
    

    constructor() {
        super();
        
        this.state = {
            suggData: null,
            suggItem: null,
            suggLoadingTag: this.suggLoadingTag(),
            buildTag: false
        }
    }


    componentWillMount() {
        // get suggestion
        this.fetchSuggestion();
    }


    componentDidUpdate() {
        if (!this.state.buildTag) {
            this.buildSuggTag();

            // set to true
            this.setState({
                buildTag: true
            });
        }
    }



    fetchSuggestion() {

        fetch('/api/suggestions/get/' + this.props.uid)
                .then(result => result.json())
                .then(result => {
                    this.setState({
                        suggData: result
                    });
                });

    }

    buildSuggTag() {
        let sugg = [];

        for (let i = 0; i < this.state.suggData.length; i++) {
            sugg.push(
                <div key={"sugg_" + this.state.suggData[i].id} className="suggestion-usd">
                    <img width="40" height="40" src={this.state.suggData[i].picture} alt=""/>
                    <div className="sgt-text">
                        <h4>{this.state.suggData[i].fullName}</h4>
                        <span>{(this.state.suggData[i].bio) ? this.state.suggData[i].bio : '-'}</span>
                    </div>
                    <span><i className="la la-plus"></i></span>
                </div>
            );
        }

        sugg.reverse();

        // change the suggItem state so we can get the result
        this.setState({
            suggItem: sugg
        });
    }

    suggLoadingTag() {
        return (
            <div className="sd-title">
                <h3>Loading...</h3>
            </div>
        )
    }



    render() {
        return (
            <div className="widget suggestions full-width">
                <div className="sd-title">
                    <h3>Most Viewed People</h3>
                    <i className="la la-ellipsis-v"></i>
                </div>
                <div className="suggestions-list">
                {(this.state.suggItem != null) ? this.state.suggItem : this.state.suggLoadingTag}
                    <div className="view-more">
                        <a href="#" title="">View More</a>
                    </div>
                </div>
			</div>
        )
    }
}
