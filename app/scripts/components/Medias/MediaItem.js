import React, { Component, PropTypes } from 'react';

export default class MediaItem extends Component {
  render() {
    return (
      <div
        className="media--item"
        onClick={() => this.props.onMediaClick(this.props.media.id)}
      >
        <p>
          {this.props.media.name}
        </p>
      </div>
    );
  }
}

