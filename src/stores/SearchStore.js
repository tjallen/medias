import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import ActionTypes from '../constants/ActionTypes';
import * as APIUtils from '../utils/API';

class SearchStore extends EventEmitter {
  constructor() {
    super();
    // initial state
    this.results = [];
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
  getResults() {
    return this.results;
  }
  handleActions(action) {
    switch (action.type) {
      case ActionTypes.GET_API_KEY: {
        APIUtils.getKey();
        break;
      }
      case ActionTypes.GET_API_KEY_SUCCESS: {
        this.API_KEY = action.API_KEY;
        this.emitChange();
        break;
      }
      case ActionTypes.SEARCH_QUERY_VALUE_CHANGE: {
        APIUtils.fetchResults(this.API_KEY, action.value);
        this.emitChange();
        break;
      }
      case ActionTypes.GET_SEARCH_RESULTS_FAIL: {
        console.log('RESULTS_FAIL, err:', action.err);
        break;
      }
      case ActionTypes.GET_SEARCH_RESULTS_SUCCESS: {
        this.results = APIUtils.normalizeResults(action.results);
        this.emitChange();
        break;
      }
      case ActionTypes.CLEAR_SEARCH_RESULTS: {
        console.log('claering results');
        this.results = [];
        this.emitChange();
        break;
      }
      default: {
        // do nothing
      }
    }
  }
}

const searchStore = new SearchStore;
dispatcher.register(searchStore.handleActions.bind(searchStore));

export default searchStore;

