import React, { Component, PropTypes } from 'react';
import 'whatwg-fetch';
import fetchJsonp from 'fetch-jsonp';

import Search from './components/Search';

export default class App extends Component {
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
    this.addResult = this.addResult.bind(this);
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
    // this.setState({
    //   results: [],
    // }, console.log('results cleared'));
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
      // if there are results, pass them to be filtered & set
      if (json.results.length > 0) {
        this.formatAndSetResults(json.results);
      } else {
        console.log('no results');
        this.clearResults();
      }
    }).catch((err) => {
      alert(err);
    });
  }
  // format results from api - just standardise some props for consistency
  // then setState with filtered results
  formatAndSetResults(results) {
    for (const result of results) {
      switch (result.media_type) {
        case 'movie':
          result.name = result.title;
          result.date = result.release_date;
          break;
        case 'tv':
          result.date = result.first_air_date;
          break;
        case 'person':
          break;
        default:
          // unknown media type WAT IS IT
          console.log('unknown result:', result);
      }
    }
    console.log(results);
    this.setState({
      results,
    });
  }
  addResult(id) {
    console.log('add this result', id);
  }
  render() {
    return (
      <Search
        results={this.state.results}
        onChange={this.handleChange}
        onClick={this.addResult}
      />
    );
  }
}
