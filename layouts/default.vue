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
    if(this.$auth.loggedIn){
      const data = {
        id: this.$auth.user.id,
      }
      this.$axios.$post('/api/user/orders', data).then((res) => {
        this["order/getOrders"](res.orders)
      })
    }
  },
  methods:{
        ...mapActions([
      'order/getOrders',
    ]),
  }
}
</script>