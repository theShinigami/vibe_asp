import React, { Component } from 'react';
import axios from 'axios';

export class Suggestions extends Component {
    static displayName = Suggestions.name;

    constructor() {
        super();

        this.state = {
            suggData: null,
            suggItem: null,
            suggLoadingTag: this.suggLoadingTag()
        }

        this.followHandler = this.followHandler.bind(this);
    }


    componentWillMount() {
        // get suggestion
        // and build tag
        this.fetchSuggestion(() => {
            this.buildSuggTag();
        });
    }


    fetchSuggestion(cb) {

        fetch('/api/suggestions/get/' + this.props.uid)
                .then(result => result.json())
                .then(result => {
                    this.setState({
                        suggData: result
                    });
                  
                    // callback
                    cb();
                });

    }

    followHandler(event) {
        // prevent from page reload
        event.preventDefault();
        
        axios({
            method: 'POST',
            url: '/api/fnf/follow/' + this.props.uid + '/' + event.target.id,
          }).then((resp) => {
            if (resp.data == 1) {
                this.fetchSuggestion(() => {
                    this.buildSuggTag();
                    this.forceUpdate();
                });
            }
            else
              alertify.error("Error while following user!");
          }).catch((err) => {
            alertify.error("Error : " + err);
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
                    <span><i onClick={this.followHandler} id={this.state.suggData[i].id} className="la la-plus"></i></span>
                </div>
            );
        }

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
            <div className="suggestions full-width">
                <div className="sd-title">
                    <h3>Suggestions</h3>
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
