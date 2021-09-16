<template>
  <div>
    <h1>ショッピングカート画面</h1>
    <div v-if="cartLength !== 0">
      <table>
        <tr>
          <th>名前</th>
          <th>写真</th>
          <th>価格</th>
          <th>個数</th>
          <th>合計</th>
          <th>削除</th>
        </tr>
        <tr v-for="item in cartData.itemInfo" :key="item._id">
          <th>{{ item.itemName }}</th>
          <th><img :src="item.itemImage" /></th>
          <th>{{ item.itemPrice }}円</th>
          <th>{{ item.buyNum }}個</th>
          <th>{{ item.itemPrice * item.buyNum }}</th>
          <th><button @click="deleteItem(item._id)">delete</button></th>
        </tr>
      </table>
      <h2>合計金額:{{ sumPrice }}</h2>
      <div><OrderForm :order-id="cartData.orderId" /></div>
    </div>
    <div v-else>
      <h1>カートが空です</h1>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import OrderForm from '../../components/OrderForm.vue'

export default {
  components: { OrderForm },
  middleware({ store, redirect }){
    if(!store.$auth.loggedIn){
      alert("このページはログイン中のユーザーのみ閲覧可能です")
      redirect('/user/login');
    }
    },
  computed: {
    cartData() {
      return this.$store.getters['shoppingCart/cartItem'][0]
    },
    cartLength() {
      if(this.$store.getters['shoppingCart/cartItem'].length ===0){
        return this.$store.getters['shoppingCart/cartItem'].length
      }else{
        return this.$store.getters['shoppingCart/cartItem'][0].itemInfo.length
      }
    },
    sumPrice() {
      if (this.$store.getters['shoppingCart/cartItem'].length !== 0) {
        let a = 0
        this.$store.getters['shoppingCart/cartItem'][0].itemInfo.forEach(
          (item) => {
            a += item.itemPrice * item.buyNum
          }
        )
        return a
      } else {
        return null
      }
    },
  },
  created() {
    
    const data = {
      id: this.$auth.user.id,
    }
    this.$axios.$post('/api/order/all-orders', data).then((res) => {
      this['shoppingCart/getOrderItem'](res.orders)
    })
  },
  methods: {
    deleteItem(id) {
      console.log(id)
      if(this.$store.getters['shoppingCart/cartItem'].length){
        const data = {
        itemId: id,
        orderId: this.$store.getters['shoppingCart/cartItem'][0].orderId,
      }
      this['shoppingCart/deleteCart'](data)
        }
    },
    ...mapActions([
      'shoppingCart/newCart',
      'shoppingCart/addCart',
      'shoppingCart/getOrderItem',
      'shoppingCart/deleteCart',
    ]),
  },
}
</script>
