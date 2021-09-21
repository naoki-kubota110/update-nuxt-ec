<template>
  <div>
    <h1>お気に入り商品</h1>
    <div v-if="cartLength !== 0">
      <table>
        <tr>
          <th>名前</th>
          <th>写真</th>
          <th>価格</th>
          <th>お気に入り</th>
        </tr>
        <tr v-for="item in cartData.itemInfo" :key="item._id">
          <!-- <router-link :to="{ path: `/item/${item.Item.itemCode}` }"> -->
          <th>{{ item.itemName }}</th>
          <!-- </router-link> -->
          <th><img :src="item.itemImage" /></th>
          <th>{{ item.itemPrice }}円</th>

          <th>
            <button @click="deleteItem(item.itemId)">お気に入り解除</button>
          </th>
        </tr>
      </table>
    </div>
    <div v-else>
      <!-- <h1>お気に入り登録商品はありません</h1> -->
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  middleware({ store, redirect }) {
    if (!store.$auth.loggedIn) {
      redirect('/user/login')
    }
  },
  computed: {
    cartData() {
      return this.$store.getters['order/CartDataArry'][0]
    },
    cartLength() {
      if (this.$store.getters['order/CartDataArry'].length === 0) {
        return this.$store.getters['order/CartDataArry'].length
      } else {
        return this.$store.getters['order/CartDataArry'][0].itemInfo.length
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
      if (this.$store.getters['order/CartDataArry'].length) {
        // カートない商品を削除するためにアイテム固有のIDと削除するオーダー情報を指定するIDを入れる
        const data = {
          itemId: id,
          orderId: this.$store.getters['order/CartDataArry'][0].orderId,
        }
        this['order/deleteCart'](data)
      }
    },
    ...mapActions(['order/getOrders', 'order/deleteCart']),
  },
}
</script>
