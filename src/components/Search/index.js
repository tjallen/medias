/* eslint-disable no-console, no-alert */

import React, { Component, PropTypes } from 'react';
import DebounceInput from 'react-debounce-input';

import SearchResults from './SearchResults';

export default class Search extends Component {
  static propTypes = {
    results: PropTypes.array.isRequired,
    apiQuery: PropTypes.func.isRequired,
    apiKey: PropTypes.string,
    onResultClick: PropTypes.func.isRequired,
  }
  constructor() {
    super();
    this.state = {
      queryLength: 0,
    };
    this.searchFieldChanged = this.searchFieldChanged.bind(this);
  }
  searchFieldChanged(e) {
    // console.log('CHANGE HANDLED');
    // console.log(e.target.value.length);
    this.setState({
      queryLength: e.target.value.length,
    });
    this.props.apiQuery(this.props.apiKey, e.target.value);
  }
  render() {
    return (
      <div>
        <DebounceInput
          className="searchfield"
          type="text"
          placeholder="Search for movies, TV shows..."
          onChange={this.searchFieldChanged}
          debounceTimeout={450}
          onBlur={this.clearResults}
          forceNotifyOnBlur={false}
        />
        <SearchResults
          queryLength={this.state.queryLength}
          results={this.props.results}
          onResultClick={this.props.onResultClick}
        />
      </div>
    );
  }
}
