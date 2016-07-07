import dispatcher from '../dispatcher';

export function placeholderAction(text) {
  dispatcher.dispatch({
    type: 'PLACEHOLDER',
    text,
  });
}
