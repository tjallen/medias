import React, { Component, PropTypes } from 'react';

export default class Modal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    modalData: PropTypes.object,
    onHideClick: PropTypes.func.isRequired,
  }
/*  componentWillMount(props) {
    console.log('mounted');
    console.log(this.props);
  }
  componentWillReceiveProps(props) {
    console.log('got props');
    console.log(this.props);
  }*/
  render() {
    // inline styles
    let styles = {
      display: 'none',
    };
    let status; // debug
    // declare data vars
    let title;
    let type;
    let date;
    let lang;
    let text;
    // debug
    if (this.props.isOpen === true) {
      styles.display = 'block';
    } else {
      styles.display = 'none';
    }
    // if there's modal data, set the vars to the data
    if (this.props.modalData) {
      console.log('modalData recieved:', this.props.modalData);
      title = this.props.modalData.name;
      type = this.props.modalData.media_type;
      date = this.props.modalData.date;
      lang = this.props.modalData.original_language;
      text = this.props.modalData.overview;
    }
    return (
      <div>
        <div style={styles} className="modal">
          <div className="modal__inner">
            <button
              className="modal__hide"
              onClick={this.props.onHideClick}
            >x</button>
            <p>{title} {type}</p>
            <p>{date} {lang}</p>
            <p>{text}</p>
            <p>Rating 1 2 3 4 5</p>
            <p>Watched || Watch list</p>
            <button>Remove media</button>
          </div>
        </div>
      </div>
    );
  }
}
