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
    console.log('CHANGE HANDLED');
    this.apiQuery(this.storedKey, e.target.value);
  }
  clearResults() {
    this.setState({
      results: [],
    }, console.log('results cleared'));
  }
  // send the api get request
  apiQuery(key, query) {
    // min query length here otherwise SHIT BREAKS LOl
    if (query.length < 3) {
      return;
    }
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
        this.clearResults();
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
          onChange={this.handleChange}
          debounceTimeout={450}
          onBlur={this.clearResults}
          forceNotifyOnBlur={false}
        />
        {this.state.results.length > 1 ? <p>{this.state.results.length} results</p> : null}
        <ul>
          {this.state.results.map((result, index) => {
            return <li key={index}>{result.id} {result.title} {result.name}</li>;
          })}
        </ul>
      </div>
    );
  }
}
