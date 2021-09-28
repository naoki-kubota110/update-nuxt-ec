<template>
  <div>
    <Header />
    <Nuxt />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
// import OrderForm from '../../components/OrderForm.vue'

export default {
  created() {
  // if(this.$store.getters["order/historyData"].length === 0){
    if(this.$auth.loggedIn){
      this["order/getOrders"]({id: this.$auth.user.id})
      this['users/getFavoriteItem']({id: this.$auth.user.id})
    }
  // }
  },
  // mounted(){
  //   if(this.$auth.loggedIn){
  //     this['users/getFavoriteItem']({id: this.$auth.user.id})
  //   }
  // },
  methods:{
    ...mapActions([
      'order/getOrders',
      'users/getFavoriteItem'
    ]),
  }
}
</script>
