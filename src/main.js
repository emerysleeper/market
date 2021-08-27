import Vue from 'vue'
import App from './App.vue'
import store from './store'
import filters from "@/filters";

Vue.config.productionTip = false

//Making global filters (it was needed when multiple vars were in different components)
Vue.filter('dollarToRuble', filters.dollarToRuble)
Vue.filter('fixedNum', filters.fixedNum)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
