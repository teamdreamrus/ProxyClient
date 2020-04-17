/* eslint-disable max-len */
import Vue from 'vue';
import App from './components/app.vue';
import { DEFAULT_LANG } from '../constants';

class Popup {
  constructor() {
    this.popup = new Vue({
      el: '#popup',
      render: h => h(App),
    });
  }
}


window.popup = new Popup();
 
