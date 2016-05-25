/* eslint-disable no-console, no-alert */

import React, { Component, PropTypes } from 'react';
import 'whatwg-fetch';
import fetchJsonp from 'fetch-jsonp';
import DebounceInput from 'react-debounce-input';

export default class Search extends Component {
  constructor() {
    super();
    // set initial state
    this.state = {
      results: [],
    };
    this.storedKey = null;
    // manual bindings
    this.handleChange = this.handleChange.bind(this);
    this.getKey = this.getKey.bind(this);
    this.clearResults = this.clearResults.bind(this);
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
  handleChange(e) {
    if (e.target.value.length === 0) {
      this.clearResults();
    } else {
      this.apiQuery(this.storedKey, e.target.value);
    }
  }
  clearResults() {
    this.setState({
      results: [],
    });
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
        <DebounceInput
          type="text"
          placeholder="Search for stuff"
          value={this.state.value}
          onChange={this.handleChange}
          onBlur={this.clearResults}
          minLength={3}
          debounceTimeout={450}
        />
        <ul>
          {this.state.results.map((result, index) => {
            return <li key={index}>{result.id} {result.title} {result.name}</li>;
          })}
        </ul>
      </div>
    );
  }
}
