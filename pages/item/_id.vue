<template>
  <div>
    {{ $store.state.shoppingCart.cart }}
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
      // selectNum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      value: 1,
    }
  },
  computed: {
    selectedItem() {
      return this.$store.state.item.shopItems.filter(
        // (item) => item.Item.id === Number(this.$route.params.id)
        (item) => item.Item.itemCode === this.$route.params.id
      )
    },
  },
  methods: {
    addCart() {
      // const cart = this.$store.state.shoppingCart.cart
      const item = {
        id: new Date().getTime().toString(),
        status: 0,
        itemInfo: [
          {
            itemId: this.selectedItem[0].Item.itemCode,
            itemName: this.selectedItem[0].Item.itemName,
            itemPrice: this.selectedItem[0].Item.itemPrice,
            itemImage: this.selectedItem[0].Item.mediumImageUrls[0].imageUrl,
            // orderId:"",
            buyNum: this.value,
          },
        ],
      }
      if (confirm('カートに商品を追加しますか?')) {
        // if (this.$store.getters.uid === null) {
        //   this.$router.push(/login/)
        // }
        // if (cart === []) {
        this['shoppingCart/newCart'](item)
        // }
        // else {
        //   const copyCart = cart
        //   const info = [...copyCart.itemInfo, item.itemInfo[0]]
        //   const data = {
        //     id: cart.id,
        //     status: 0,
        //     itemInfo: info,
        //   }
        //   this['shoppingCart/addCart'](data)
        //   // this.$store.dispatch('addCart', { user: this.user, data })
        // }
      }
    },
    ...mapActions(['shoppingCart/newCart', 'shoppingCart/addCart']),
  },
}
</script>
