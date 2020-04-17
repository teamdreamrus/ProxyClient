/* eslint-disable max-len */
import Vue from 'vue';
import App from './components/app.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


class Popup {
  constructor() {
    this.popup = new Vue({
      el: '#popup',
      render: h => h(App),
    });
  }
}


window.popup = new Popup();

