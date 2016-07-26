import React, { Component, PropTypes } from 'react';
import MediaItem from './MediaItem';
// flux
import * as MediaActions from '../../actions/MediaActions';
import MediaStore from '../../stores/MediaStore';

export default class Medias extends Component {
  // static propTypes = {
  //   medias: PropTypes.array.isRequired,
  //   onMediaClick: PropTypes.func.isRequired,
  // }
  constructor() {
    super();
    // initial state
    this.state = {
      medias: MediaStore.getMedias(),
    };
    // prebind
    this.onMediaClick = MediaActions.onMediaClick.bind(this);
    // evt listeners
    MediaStore.on('CHANGE', () => {
      console.log('media view event listener CHANGE');
      this.setState({
        medias: MediaStore.getMedias(),
      });
    });
  }
  render() {
    return (
      <div className="medias">
        <ul className="medias__list">
          {this.state.medias.map((media) =>
            <MediaItem
              key={media.id}
              media={media}
              onMediaClick={this.onMediaClick}
              poster={media.poster_path}
            />
          )}
        </ul>
      </div>
    );
  }
}
