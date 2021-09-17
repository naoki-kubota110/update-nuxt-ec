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
  // created() {
  //   if(this.$auth.loggedIn){
  //     const data = {
  //       id: this.$auth.user.id,
  //     }
  //     this.$axios.$post('/api/order/orders', data).then((res) => {
  //       this["order/getOrders"](res.orders)
  //     })
  //   }
  // },
    created() {
    if(this.$store.getters["order/historyData"].length === 0){
 console.log("注文履歴")
      if(this.$auth.loggedIn){
        this["order/getOrders"]({id: this.$auth.user.id})
     }
       }
  },
  methods:{
    ...mapActions([
      'order/getOrders',
    ]),
  }
}
</script>
