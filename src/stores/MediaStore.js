import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import ActionTypes from '../constants/ActionTypes';
import * as APIUtils from '../utils/API';

class MediaStore extends EventEmitter {
  constructor() {
    super();
    // initial state
    this.medias = [];
    this.API_KEY = null;
  }
  emitChange() {
    this.emit('CHANGE');
  }
  addChangeListener(callback) {
    this.on('CHANGE', callback);
  }
  removeChangeListener(callback) {
    this.removeListener('CHANGE', callback);
  }
  getMedias() {
    return this.medias;
  }
  addResult(result) {
    console.log('adding result', result);
    const id = result.id;
    // check if result was already added to medias
    if (this.medias.find(media => media.id === id)) {
      alert('result already added to medias');
      return;
    }
    this.medias.push(result);
    this.emitChange();
    // -> callback -> clearResults();
  }
  handleActions(action) {
    switch (action.type) {
      case ActionTypes.GET_API_KEY: {
        APIUtils.getKey();
        break;
      }
      case ActionTypes.GET_API_KEY_SUCCESS: {
        this.API_KEY = action.API_KEY;
        break;
      }
      case ActionTypes.ADD_MEDIA: {
        console.log('mediaStore got action', action);
        this.addResult(action.result);
        break;
      }
      default: {
        // do nothing
      }
    }
  }
}

const mediaStore = new MediaStore;
dispatcher.register(mediaStore.handleActions.bind(mediaStore));

export default mediaStore;

