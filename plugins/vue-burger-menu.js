import Vue from 'vue'
import VueBurgerMenu from 'vue-burger-menu'

if (process.client) {
  Vue.use(VueBurgerMenu)
}
// Vue.component('VueBurgerMenu', VueBurgerMenu)
