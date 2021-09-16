<template>
  <div>
    <h1>注文履歴</h1>
    <div v-if="historyLength !== 0">
      <table>
        <tr>
          <th>商品名</th>
          <th>商品イメージ</th>
          <th>価格</th>
          <th>価格</th>
          <th>個数</th>
          <th>合計</th>
          <th>----</th>
        </tr>
        <tr v-for="item in historyArray" :key="item.orderId">
          <th>
            <div v-for="info in item.itemInfo" :key="info._id">
              {{info.itemName}}
            </div>
          </th>
          <th>
          <th>
            <div v-for="info in item.itemInfo" :key="info._id">
              <img :src="info.itemImage"> 
            </div>
          </th>
          <th>
            <div v-for="info in item.itemInfo" :key="info._id">
              {{info.itemPrice}}円
            </div>
          </th>
          <th>
            <div v-for="info in item.itemInfo" :key="info._id">
              {{info.buyNum}}個
            </div>
          </th>
          <th>
            <div v-for="info in item.itemInfo" :key="info._id">
              {{info.itemPrice * info.buyNum}}円
            </div>
          </th>
          <th>
            <div v-if="item.status === 9">
              キャンセル済み
            </div>
            <div v-else>
              <button @click="cancelOrder(item.orderId)">キャンセル</button>
            </div>
          </th>
          <th><button @click="cancelOrder(item.orderId)">キャンセル</button></th>
        </tr>
      </table>
      <h2>合計金額</h2>
    </div>
    <div v-else>
      <h1>カートが空です</h1>
    </div>
  </div>
</template>

<script>
export default {
    middleware({ store, redirect }){
    if(!store.$auth.loggedIn){
      alert("このページはログイン中のユーザーのみ閲覧可能です")
      redirect('/user/login');
    }
    },
  data() {
    return {
    }
  },
  computed: {
    historyArray(){
      return this.$store.getters["order/historyData"]
    },
    historyLength(){
      return this.$store.getters["order/historyData"].length
    }
  },
  methods:{
    cancelOrder(id){
      this.$axios.$post('/api/order/cancel-order', {orderId: id})
    }
  }
}
</script>