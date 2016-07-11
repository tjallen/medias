import 'whatwg-fetch';
import fetchJsonp from 'fetch-jsonp';
import dispatcher from '../dispatcher';
import ActionTypes from '../constants/ActionTypes';

export function getKey() {
  fetch('../../keys.json', {
    method: 'get',
    dataType: 'json',
  }).then((response) =>
    response.json()
  ).then((json) => {
    dispatcher.dispatch({
      type: ActionTypes.GET_API_KEY_SUCCESS,
      API_KEY: json.keys.moviesdb,
    });
    return json.keys.moviesdb;
  })
  .catch((err) => {
    alert(err);
  });
}

export function fetchResults(key, query, params='search/multi') {
  /* react-debounce-input minLength={3} was failing when the input value/query
  was backspaced / deleted to below the minLength so we test here instead */
  if (query.length < 3) {
    return;
  }
  const apiRoot = 'https://api.themoviedb.org/3/';
  const url = `${apiRoot}${params}?api_key=${key}&query=${query}`;
  console.log('fetching', url);
  fetchJsonp(url, {
    method: 'get',
    http: {
      headers: {
        'Api-User-Agent':
        'Medias 0.1 (https://github.com/tjallen/medias); thomwork@gmail.com',
      },
    },
  }).then((response) => response.json()
  ).then((json) => {
    dispatcher.dispatch({
      type: ActionTypes.GET_SEARCH_RESULTS_SUCCESS,
      results: json.results,
    });
    return json.results;
  })
  .catch((err) => {
    dispatcher.dispatch({ type: ActionTypes.GET_SEARCH_RESULTS_FAIL, err });
  });
}

export function normalizeResults(results) {
  for (const result of results) {
    // new standard props
    result.rating = null;
    result.watched = null;
    // standardise props that differ by type on api
    switch (result.media_type) {
      case 'movie':
        result.name = result.title;
        result.date = result.release_date.substring(0, 4);
        break;
      case 'tv':
        result.date = result.first_air_date.substring(0, 4);
        break;
      case 'person':
        break;
      default:
        // unknown media type - shouldn't happen
        console.log('unknown result:', result);
    }
  }
  //console.log(results);
  return results;
}
