import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import vueresource from "vue-resource";

Vue.config.productionTip = false;
Vue.use(vueresource);

new Vue({
  vuetify, 
  render: h => h(App)
}).$mount('#app')
