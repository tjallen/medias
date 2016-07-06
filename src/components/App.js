/* eslint-disable no-console, no-alert */

import React, { Component } from 'react';
import 'whatwg-fetch';
import fetchJsonp from 'fetch-jsonp';

import Modal from './Modal';
import Search from './Search';
import Medias from './Medias';

export default class App extends Component {
  constructor() {
    super();
    // set initial state
    this.state = {
      apiKey: null,
      results: [],
      medias: [],
      modalOpen: false,
      modalData: null,
    };

    // manual bindings
    this.getKey = this.getKey.bind(this);
    this.clearResults = this.clearResults.bind(this);
    this.addResult = this.addResult.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.apiQuery = this.apiQuery.bind(this);
  }
  componentDidMount() {
    this.getKey();
  }
  // get api key from local file
  getKey() {
    fetch('keys.json', {
      method: 'get',
      dataType: 'json',
    }).then((response) =>
      response.json()
    ).then((json) => {
      // store the key in state for component queries
      this.setState({
        apiKey: json.keys.moviesdb,
      });
    })
    .catch((err) => {
      alert(err);
    });
  }
  clearResults() {
    this.setState({
      results: [],
    }, console.log('results cleared'));
  }
  // send the api get request
  apiQuery(key, query) {
    // min query length here otherwise SHIT BREAKS LOl
    if (query.length < 3) {
      return;
    }
    console.log(`apiQuery called with ${query}`);
    fetchJsonp(`https://api.themoviedb.org/3/search/multi?api_key=${key}&query=${query}`, {
      method: 'get',
      http: {
        headers: {
          'Api-User-Agent':
          'Medias 0.1 (https://github.com/tjallen/medias); thomwork@gmail.com',
        },
      },
    }).then((response) => response.json()
    ).then((json) => {
      // if there are results, pass them to be filtered & set
      if (json.results.length > 0) {
        console.log(json.results);
        this.formatAndSetResults(json.results);
      } else {
        console.log('no results');
        this.clearResults();
      }
    })
    .catch((err) => {
      alert(err);
    });
  }
  // format results from api - just standardise some props for consistency
  // then setState with these formatted results
  formatAndSetResults(results) {
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
    console.log(results);
    this.setState({
      results,
    });
  }
  addResult(id, index) {
    // check if result was already added to medias
    if (this.state.medias.find(media => media.id === id)) {
      alert('result already added to medias');
      return;
    }
    // add clicked result to the new mutated medias array
    const resultToAdd = this.state.results[index];
    const mutatedList = this.state.medias;
    mutatedList.push(resultToAdd);
    // replace old medias array state with mutated array
    this.setState({
      medias: mutatedList,
    });
    this.clearResults();
  }
  showModal(id) {
    const mediaToPass = this.state.medias.find(media => media.id === id);
    this.setState({
      modalData: mediaToPass,
      modalOpen: true,
    });
    console.log('open ma modal', id);
    console.log(mediaToPass);
  }
  hideModal() {
    console.log('hide the modal');
    this.setState({
      modalData: null,
      modalOpen: false,
    });
  }
  render() {
    return (
      <div>
        <Modal
          ref="modal"
          isOpen={this.state.modalOpen}
          modalData={this.state.modalData}
          onHideClick={this.hideModal}
        />
        <Search
          results={this.state.results}
          onResultClick={this.addResult}
          apiQuery={this.apiQuery}
          apiKey={this.state.apiKey}
        />
        <Medias
          medias={this.state.medias}
          onMediaClick={this.showModal}
          onRemoveMediaClick={this.removeMedia}
        />
      </div>
    );
  }
}
