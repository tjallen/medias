import React, { Component, PropTypes } from 'react';

import SearchResult from './SearchResult';

export default class SearchResults extends Component {
  render() {
    return (
      <div className="results">
        <ul>
        {/* if a query is being typed, display the result count */}
        {this.props.queryLength > 1 ? <li className="counter">
        {this.props.results.length} results
        </li> : null}
          {/* iterate over the results array and render each */}
          {this.props.results.map((result, index) =>
            <SearchResult
              key={result.id}
              result={result}
              onSearchResultClick={this.props.onSearchResultClick}
              index={index}
            />
          )}
        </ul>
      </div>
    );
  }
}

SearchResults.propTypes = {
  queryLength: PropTypes.number,
  results: PropTypes.array.isRequired,
  onSearchResultClick: PropTypes.func.isRequired,
};
