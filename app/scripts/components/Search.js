/* eslint-disable no-console, no-alert */

import React from 'react';
import 'whatwg-fetch';
import fetchJsonp from 'fetch-jsonp';

export default class Search extends React.Component {
  constructor() {
    super();
    // set initial state
    this.state = {
      results: [],
    };
    this.storedKey = null;
    // manual bindings
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.getKey = this.getKey.bind(this);
  }
  componentDidMount() {
    this.getKey();
  }
  // get api key from local file
  getKey() {
    fetch('keys.json', {
      method: 'get',
      dataType: 'json',
    }).then((response) => {
      return response.json();
    }).then((json) => {
      // store the key for use in api queries
      this.storedKey = json.keys.moviesdb;
    }).catch((err) => {
      alert(err);
    });
  }
  // update the state from input value
  handleKeyUp(e) {
    console.log(e.target.value);
    this.apiQuery(this.storedKey, e.target.value);
  }
  // send the api get request
  apiQuery(key, query) {
    console.log(`apiQuery called with ${query}`);
    fetchJsonp(`https://api.themoviedb.org/3/search/multi?api_key=${key}&query=${query}`, {
      method: 'get',
      http: {
        headers: {
          'Api-User-Agent':
          'Medias 0.1 (https://github.com/tjallen/medias); thomwork@gmail.com',
        },
      },
    }).then((response) => response.json()
    ).then((json) => {
      if (json.results.length > 0) {
        console.log(json.results.length, ' results');
        this.setState({
          results: json.results,
        });
      } else {
        console.log('no results');
      }
    }).catch((err) => {
      alert(err);
    });
  }
  // probably standardise results.title etc as in vue here
  // filterApiResults(results) {
  //   for (const result of results) {
  //     console.log(result);
  //   }
  // }
  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search for stuff"
          value={this.state.value}
          onSubmit={this.handleKeyUp}
          onKeyUp={this.handleKeyUp}
        >
        </input>
        <ul>
          {this.state.results.map((result, index) => {
            return <li key={index}>{result.id} {result.title} {result.name}</li>;
          })}
        </ul>
      </div>
    );
  }
}
