<template>
  <div>
    <!-- {{ $store.state.shoppingCart.cart }} -->
    <h1>商品詳細</h1>
    <ul class="itemList">
      <li v-for="item in selectedItem" :key="item.Item.itemCode">
        <p>
          <img :src="item.Item.mediumImageUrls[0].imageUrl" />
        </p>
        <p>{{ [item.Item.itemPrice].toLocaleString() }}円(税込)</p>
        数量：
        <select v-model="value">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="5">6</option>
          <option value="5">7</option>
          <option value="5">8</option>
          <option value="5">9</option>
          <option value="5">10</option>
        </select>
        <p>
          合計：{{ [item.Item.itemPrice * value].toLocaleString() }}円(税込)
        </p>
        <p><button @click="addCart">カートに入れる</button></p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      value: 1,
    }
  },
  computed: {
    selectedItem() {
      return this.$store.state.item.shopItems.filter(
        (item) => item.Item.itemCode === this.$route.params.id
      )
    },
  },
  // mounted() {
  //   window.addEventListener('beforeunload', () => {
  //     this.$router.push('/')
  //     console.log('はっか')
  //   })
  // },
  // destroyed() {
  //   window.removeEventListener('beforeunload', () => {
  //     this.$router.push('/')
  //   })
  // created(){
  //   if(this.$auth.loggedIn){
  //     this["order/getOrders"]({id: this.$auth.user.id})
  //   }
  // },

  methods: {
    addCart() {
      if (this.$auth.loggedIn) {
        const item = {
          orderId: new Date().getTime().toString(),
          status: 0,
          userId: this.$auth.user.id,
          addCartDate: new Date().toString(),
          itemInfo: [
            {
              itemId: this.selectedItem[0].Item.itemCode,
              itemName: this.selectedItem[0].Item.itemName,
              itemPrice: this.selectedItem[0].Item.itemPrice,
              itemImage: this.selectedItem[0].Item.mediumImageUrls[0].imageUrl,
              buyNum: this.value,
            },
          ],
        }
        // ユーザーのオーダー配列が空（まだ一回もカートに入れたことがない）、またはカートに入れているが注文は実行していない場合
        if (this.$store.getters['order/CartDataArry'].length === 0) {
          console.log('neworder')
          if (confirm('カートに追加しますか？')) {
            this['order/newCart'](item)
          }
          // ユーザーのオーダー配列にstatusが０のオブジェクトがある
        } else {
          console.log('addorder呼び出し')
          const payload = {
            orderId: this.$store.getters['order/CartDataArry'][0].orderId,
            itemId: this.selectedItem[0].Item.itemCode,
            itemName: this.selectedItem[0].Item.itemName,
            itemPrice: this.selectedItem[0].Item.itemPrice,
            itemImage: this.selectedItem[0].Item.mediumImageUrls[0].imageUrl,
            buyNum: this.value,
          }
          if (confirm('カートに追加しますか？')) {
            this['order/addCart'](payload)
          }
        }
      } else {
        alert('カートに追加するにはログインしてください')
        this.$router.push('/user/login')
      }
    },
    ...mapActions(['order/getOrders', 'order/newCart', 'order/addCart']),
  },
}
</script>

<style lang="scss" scoped>
li {
  list-style: none;
}
</style>
