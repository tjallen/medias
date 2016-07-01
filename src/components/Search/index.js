/* eslint-disable no-console, no-alert */

import React, { Component, PropTypes } from 'react';
import DebounceInput from 'react-debounce-input';

import SearchResults from './SearchResults';

import styles from './styles.scss';

export default class Search extends Component {
  static propTypes = {
    results: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
  }
  render() {
    return (
      <div>
        <DebounceInput
          className={styles.root}
          type="text"
          placeholder="Search for stuff"
          onChange={this.props.onChange}
          debounceTimeout={450}
          onBlur={this.clearResults}
          forceNotifyOnBlur={false}
        />
        <SearchResults
          results={this.props.results}
          onClick={this.props.onClick}
        />
      </div>
    );
  }
}
