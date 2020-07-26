import Vue from 'vue'
import App from './App.vue'
import ScrollLoader from 'vue-scroll-loader'
import Toasted from 'vue-toasted'

Vue.config.productionTip = false

Vue.use(ScrollLoader)
Vue.use(Toasted, {
  theme: "toasted-primary", 
  position: "top-right", 
	duration : 5000
})

new Vue({
  render: h => h(App),
}).$mount('#app')
