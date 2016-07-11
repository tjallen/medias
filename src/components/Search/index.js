/* eslint-disable no-console, no-alert */

// react and npm module imported components
import React, { Component, PropTypes } from 'react';
import DebounceInput from 'react-debounce-input';
// flux
import * as SearchActions from '../../actions/SearchActions';
import SearchStore from '../../stores/SearchStore';
// child components
import SearchResults from './SearchResults';

export default class Search extends Component {
  // static propTypes = {
  //   // results: PropTypes.array.isRequired,
  //   // apiQuery: PropTypes.func.isRequired,
  //   // apiKey: PropTypes.string,
  //   // onResultClick: PropTypes.func.isRequired,
  // }
  constructor() {
    super();
    // initial state
    this.state = {
      results: SearchStore.getResults(),
    };
    // prebind
    this.onSearchChange = SearchActions.onSearchChange.bind(this);
    this.onSearchResultClick = SearchActions.onSearchResultClick.bind(this);
    // evt listeners
    SearchStore.on('CHANGE', () => {
      console.log('search view event listener CHANGE');
      this.setState({
        results: SearchStore.getResults(),
      });
    });
  }
  componentDidMount() {
    SearchActions.onSearchComponentMount();
  }
/*  onSearchChange(e) {
    // console.log('CHANGE HANDLED');
    // console.log(e.target.value.length);
    this.setState({
      queryLength: e.target.value.length,
    });
    this.props.apiQuery(this.props.apiKey, e.target.value);
  }*/
  onSearchBlur() {
    // shd be changed to callbacks/promises otherwise sync messes up
    SearchActions.clearResults();
  }
  render() {
    return (
      <div>
        <DebounceInput
          className="searchfield"
          type="text"
          placeholder="Search for movies, TV shows..."
          onChange={this.onSearchChange}
          debounceTimeout={450}
          onBlur={this.onSearchBlur}
          forceNotifyOnBlur={false}
        />
        <SearchResults
          queryLength={this.state.queryLength}
          results={this.state.results}
          onSearchResultClick={this.onSearchResultClick}
        />
      </div>
    );
  }
}
