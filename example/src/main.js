import Vue from 'vue'
import App from './App.vue'
import router from './router'
import RegisterBSComponent from './components/index.js'
RegisterBSComponent.register();


import wenList from 'wen-vue-list'
Vue.use(wenList);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
