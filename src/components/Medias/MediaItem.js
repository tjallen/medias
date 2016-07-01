import React, { PropTypes } from 'react';

const MediaItem = (props) =>
  <div
    className="media--item"
    onClick={() => props.onMediaClick(props.media.id)}
  >
    <p>
      {props.media.name}
    </p>
  </div>;

MediaItem.propTypes = {
  media: PropTypes.object.isRequired,
  onMediaClick: PropTypes.func.isRequired,
};

export default MediaItem;

