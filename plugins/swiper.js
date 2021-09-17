import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'
import 'swiper/swiper-bundle.css'
import { Autoplay, Pagination, Swiper } from 'swiper'

Vue.use(VueAwesomeSwiper)
Swiper.use([Autoplay, Pagination])
