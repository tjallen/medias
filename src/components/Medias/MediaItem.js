import React, { PropTypes } from 'react';

import placeImg from '../../images/place.jpg';

const mediaStyle = {
  backgroundImage: `url(${placeImg})`,
}

const MediaItem = (props) =>
  <li
    style={mediaStyle}
    className="medias__item"
    onClick={() => props.onMediaClick(props.media.id)}
  >
    <p>
      {props.media.name}
    </p>
  </li>;

MediaItem.propTypes = {
  media: PropTypes.object.isRequired,
  onMediaClick: PropTypes.func.isRequired,
};

export default MediaItem;

