import dispatcher from '../dispatcher';
import ActionTypes from '../constants/ActionTypes';

// export function onSearchResultClick(result) {
//   dispatcher.dispatch({
//     type: ActionTypes.ADD_MEDIA,
//     result,
//   });
// }

export function onMediaClick(media) {
  dispatcher.dispatch({
    type: ActionTypes.OPEN_MODAL,
    media,
  });
}
