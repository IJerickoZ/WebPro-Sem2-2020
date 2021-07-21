import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bulma/css/bulma.css'
import Vuelidate from 'vuelidate'
Vue.config.productionTip = false
Vue.use(Vuelidate)
new Vue({
  router,  // add router here
  render: h => h(App),
}).$mount('#app')