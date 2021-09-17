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
          <th><button @click="deleteItem(item.itemId)">delete</button></th>
        </tr>
      </table>
      <h2>合計金額:{{ CartSumPrice }}</h2>
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
  middleware({ store, redirect }) {
    if (!store.$auth.loggedIn) {
      redirect('/user/login')
    }
  },
  computed: {
    cartData() {
      return this.$store.getters["order/CartDataArry"][0]
    },
    cartLength() {
      if (this.$store.getters["order/CartDataArry"].length === 0) {
        return this.$store.getters["order/CartDataArry"].length
      } else {
        return this.$store.getters["order/CartDataArry"][0].itemInfo.length
      }
    },
    CartSumPrice() {
      if (this.$store.getters["order/CartDataArry"].length !== 0) {
        let sumPrice = 0
        this.$store.getters["order/CartDataArry"][0].itemInfo.forEach(
          (item) => {
            sumPrice += (item.itemPrice * item.buyNum)
          }
        )
        return sumPrice
      } else {
        return 0
      }
    },
  },
  // created() {
  //    if(this.$auth.loggedIn){
  //     this["order/getOrders"]({id: this.$auth.user.id})
  //    }
  // },
  methods: {
    deleteItem(id) {
      if (this.$store.getters["order/CartDataArry"].length) {
        // カートない商品を削除するためにアイテム固有のIDと削除するオーダー情報を指定するIDを入れる
        const data = {
          itemId: id,
          orderId: this.$store.getters["order/CartDataArry"][0].orderId,
        }
        this['order/deleteCart'](data)
      }
    },
    ...mapActions([
      "order/getOrders",
      "order/deleteCart",
    ]),
  },
}
</script>
