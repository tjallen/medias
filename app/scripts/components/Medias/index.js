import React, { Component, PropTypes } from 'react';

export default class Medias extends Component {
  static propTypes = {
    medias: PropTypes.array.isRequired,
    onMediaClick: PropTypes.func.isRequired,
  }
  render() {
    return (
      <div className="medias">
          {this.props.medias.map((media) =>
            <div
              className="media--item"
              key={media.id}
              onClick={() => this.props.onMediaClick(media.id)}
            >
              <p>
                {media.name}
              </p>
            </div>
          )}
      </div>
    );
  }
}
