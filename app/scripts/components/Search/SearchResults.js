/* eslint-disable prefer-stateless-function */
// ^ this component as a stateless function breaks props, NAUGHTY ESLINT?!?!

import React, { Component, PropTypes } from 'react';

export default class SearchResults extends Component {
  static propTypes = {
    results: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
  }
  render() {
    return (
      <div>
        {this.props.results.length > 1 ? <p>{this.props.results.length} results</p> : null}
        <ul>
          {this.props.results.map((result) =>
            <li
              key={result.id}
              onClick={() => this.props.onClick(result.id)}
            >
              Name: {result.name}<br />
              Language: {result.original_language}<br />
              Type: {result.media_type}<br />
              Year: {result.date}<br />
            </li>
          )}
        </ul>
      </div>
    );
  }
}
