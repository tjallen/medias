import React, { Component, PropTypes } from 'react';

import classNames from 'classnames';
import styles from './styles.scss';

export default class SearchResult extends Component {
  render() {
    return (
      <li
        className={styles.media}
        onClick={() => this.props.onClick(this.props.result.id, this.props.index)}
      >
        <p
          className={styles.title}
        >
          {this.props.result.name}
        </p>
        <span
          className={styles.type}
        >
          {this.props.result.media_type}
        </span>
        {/* conditionally render a date */}
        {this.props.result.date ? <span
          className={styles.date}
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
