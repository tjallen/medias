import React, { Component, PropTypes } from 'react';

import SearchResult from './SearchResult';

import classNames from 'classnames';
import styles from './styles.scss';

let cx = classNames.bind(styles);

export default class SearchResults extends Component {
  render() {
    return (
      <div className={styles.results}>
        <ul>
          {/* if there are results, display the count */}
          {this.props.results.length > 1 ? <li className={styles.counter}>
          {this.props.results.length} results
          </li> : null}
          {/* iterate over the results array and render each */}
          {this.props.results.map((result, index) =>
            <SearchResult
              key={result.id}
              result={result}
              onClick={this.props.onClick}
              index={index}
            />
          )}
        </ul>
      </div>
    );
  }
}

SearchResults.propTypes = {
  results: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
