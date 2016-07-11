/* eslint-disable no-console, no-alert */

import React, { Component } from 'react';
// import 'whatwg-fetch';
// import fetchJsonp from 'fetch-jsonp';
// import * as API from '../utils/API';

import Modal from './Modal';
import Search from './Search';
import Medias from './Medias';

export default class App extends Component {
  constructor() {
    super();
    // set initial state
    this.state = {
      //apiKey: API.getKey(),
      //results: [],
      //medias: [],
      modalOpen: false,
      modalData: null,
    };
    // manual bindings
    //this.clearResults = this.clearResults.bind(this);
    //this.addResult = this.addResult.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    //this.apiQuery = this.apiQuery.bind(this);
  }
  // componentDidMount() {
  //   console.log('key: ',this.state.apiKey);
  // }
  // clearResults() {
  //   this.setState({
  //     results: [],
  //   }, console.log('results cleared'));
  // }
  // addResult(id, index) {
  //   console.log('ADDRESULT');
  //   // check if result was already added to medias
  //   if (this.state.medias.find(media => media.id === id)) {
  //     alert('result already added to medias');
  //     return;
  //   }
  //   // add clicked result to the new mutated medias array
  //   const resultToAdd = this.state.results[index];
  //   const mutatedList = this.state.medias;
  //   mutatedList.push(resultToAdd);
  //   // replace old medias array state with mutated array
  //   this.setState({
  //     medias: mutatedList,
  //   });
  //   this.clearResults();
  // }
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
        <Search />
        <Medias
          medias={this.state.medias}
          onMediaClick={this.showModal}
          onRemoveMediaClick={this.removeMedia}
        />
      </div>
    );
  }
}
