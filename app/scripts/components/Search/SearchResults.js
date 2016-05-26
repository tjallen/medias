/* eslint-disable no-console, no-alert */

import React, { Component, PropTypes } from 'react';

export default class Results extends Component {
  static propTypes = {
    results: PropTypes.array.isRequired,
  }
  render() {
    return (
      <div>
        {this.props.results.length > 1 ? <p>{this.props.results.length} results</p> : null}
        <ul>
          {this.props.results.map((result) => {
            return (
              <li key={result.id}>
                Name: {result.name}<br />
                Language: {result.original_language}<br />
                Type: {result.media_type}<br />
                Year: {result.date}<br />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
