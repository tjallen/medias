import React, { Component, PropTypes } from 'react';
import MediaItem from './MediaItem';

export default class Medias extends Component {
  static propTypes = {
    medias: PropTypes.array.isRequired,
    onMediaClick: PropTypes.func.isRequired,
  }
  render() {
    return (
      <div className="medias">
        <ul className="medias__list">
          {this.props.medias.map((media) =>
            <MediaItem
              key={media.id}
              media={media}
              onMediaClick={this.props.onMediaClick}
              poster={media.poster_path}
            />
          )}
        </ul>
      </div>
    );
  }
}
