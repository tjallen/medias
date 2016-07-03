import React, { Component, PropTypes } from 'react';

export default class SearchResult extends Component {
  render() {
    let type = this.props.result.media_type;
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
          className="typelabel"
        >
          {type}
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
