import React, { Component, PropTypes } from 'react';

import placeImg from '../../images/place.jpg';

export default class MediaItem extends Component {
  render() {
    // by default, use the placeholder poster
    let posterUrl = placeImg;
    // but if the api returns a poster image we use that instead
    if (this.props.poster) {
      posterUrl = `https://image.tmdb.org/t/p/w396/${this.props.poster}`;
    }
    return (
      <li
        className="medias__item"
        onClick={() => this.props.onMediaClick(this.props.media.id)}
      >
        <img className="medias__image" src={posterUrl} alt={this.props.media.name} />
        <h4 className="medias__title">
          {this.props.media.name} ({this.props.media.media_type})
        </h4>
      </li>
    );
  }
}

MediaItem.propTypes = {
  poster: PropTypes.string,
  media: PropTypes.object.isRequired,
  onMediaClick: PropTypes.func.isRequired,
};

