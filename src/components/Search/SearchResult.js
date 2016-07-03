import React, { Component, PropTypes } from 'react';

export default class SearchResult extends Component {
  render() {
    const mediaType = this.props.result.media_type;
    let typeClass;
    switch (mediaType) {
      case 'tv':
        typeClass = 'typelabel tv';
        break;
      case 'movie':
        typeClass = 'typelabel movie';
        break;
      default:
        // do nothing
    }
    return (
      <li
        className="media"
        onClick={() => this.props.onClick(this.props.result.id, this.props.index)}
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
          className={this.props.result.original_language}
        >
          {this.props.result.original_language}
        </span>
      </li>
    );
  }
}

SearchResult.propTypes = {
  index: PropTypes.number.isRequired,
  result: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
