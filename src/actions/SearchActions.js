import dispatcher from '../dispatcher';
import ActionTypes from '../constants/ActionTypes';

export function onSearchChange(evt) {
  dispatcher.dispatch({
    type: ActionTypes.SEARCH_QUERY_VALUE_CHANGE,
    value: evt.target.value,
  });
}

export function onSearchComponentMount() {
  dispatcher.dispatch({
    type: ActionTypes.GET_API_KEY,
  });
}

export function loadResults(query) {
  dispatcher.dispatch({
    type: ActionTypes.GET_SEARCH_RESULTS,
    value: query,
  });
}

export function clearResults() {
  dispatcher.dispatch({
    type: ActionTypes.CLEAR_SEARCH_RESULTS,
  });
}

// ASYNC GOING IN HERE BREH
export function onSearchResultClick(result) {
  dispatcher.dispatch({
    type: ActionTypes.ADD_MEDIA,
    result,
  });
}
