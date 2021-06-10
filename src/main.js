import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueResourse from 'vue-resource'
import vuelidate from 'vuelidate'



Vue.use(vuelidate)
Vue.use(VueResourse)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
