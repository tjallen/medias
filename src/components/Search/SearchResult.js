import React, { Component, PropTypes } from 'react';

export default class SearchResult extends Component {
  render() {
    const mediaType = this.props.result.media_type;
    const typeClass = `typelabel ${mediaType}`;
    let country = (
      this.props.result.origin_country ? this.props.result.origin_country[0] : null
    );
    return (
      <li
        className="media"
        onClick={() => this.props.onSearchResultClick(this.props.result)}
      >
        <p
          className="title"
        >
          {this.props.result.name}
        </p>
        <span
          className={typeClass}
        >
          {mediaType}
        </span>
        {/* conditionally render a date */}
        {this.props.result.date ? <span
          className="date"
        >
          {this.props.result.date}
        </span> : null}
        <span
          className="lang"
        >
          {this.props.result.original_language}
        </span>
        <span
          className="country"
        >
          {country}
        </span>
      </li>
    );
  }
}

SearchResult.propTypes = {
  // index: PropTypes.number.isRequired,
  result: PropTypes.object.isRequired,
  // onSearchResultClick: PropTypes.func.isRequired,
};
