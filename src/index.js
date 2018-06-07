import Vue from 'vue';
import Vuex from 'vuex';
import store from './store.js';
import App from './components/App.vue';

Vue.use(Vuex);

new Vue({
  el: ".app",
  store: new Vuex.Store(store),
  render: h => h(App)
});
