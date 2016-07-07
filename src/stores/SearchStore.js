import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';

class SearchStore extends EventEmitter {
  handleActions(action) {
    console.log('todostore got action', action);
  }
}

const searchStore = new SearchStore;
dispatcher.register(searchStore.handleActions.bind(searchStore));

export default searchStore;

