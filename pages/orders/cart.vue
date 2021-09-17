<template>
  <div>
    <h1>ショッピングカート画面</h1>
    <div v-if="cartLength !== 0">
      <div class="shopping-cart">

  <div class="column-labels">
    <label class="product-image">Image</label>
    <label class="product-details">Product</label>
    <label class="product-price">Price</label>
    <label class="product-quantity">Quantity</label>
    <label class="product-removal">Remove</label>
    <label class="product-line-price">Total</label>
  </div>

  <div class="product">
    <div class="product-image">
      <img src="https://s.cdpn.io/3/dingo-dog-bones.jpg">
    </div>
    <div class="product-details">
      <div class="product-title">Dingo Dog Bones</div>
      <p class="product-description">The best dog bones of all time. Holy crap. Your dog will be begging for these things! I got curious once and ate one myself. I'm a fan.</p>
    </div>
    <div class="product-price">12.99</div>
    <div class="product-quantity">
      <input type="number" value="2" min="1">
    </div>
    <div class="product-removal">
      <button class="remove-product">
        Remove
      </button>
    </div>
    <div class="product-line-price">25.98</div>
  </div>

  <div class="product">
    <div class="product-image">
      <img src="https://s.cdpn.io/3/large-NutroNaturalChoiceAdultLambMealandRiceDryDogFood.png">
    </div>
    <div class="product-details">
      <div class="product-title">Nutro™ Adult Lamb and Rice Dog Food</div>
      <p class="product-description">Who doesn't like lamb and rice? We've all hit the halal cart at 3am while quasi-blackout after a night of binge drinking in Manhattan. Now it's your dog's turn!</p>
    </div>
    <div class="product-price">45.99</div>
    <div class="product-quantity">
      <input type="number" value="1" min="1">
    </div>
    <div class="product-removal">
      <button class="remove-product">
        Remove
      </button>
    </div>
    <div class="product-line-price">45.99</div>
  </div>

  <div class="totals">
    <div class="totals-item">
      <label>Subtotal</label>
      <div class="totals-value" id="cart-subtotal">71.97</div>
    </div>
    <div class="totals-item">
      <label>Tax (5%)</label>
      <div class="totals-value" id="cart-tax">3.60</div>
    </div>
    <div class="totals-item">
      <label>Shipping</label>
      <div class="totals-value" id="cart-shipping">15.00</div>
    </div>
    <div class="totals-item totals-item-total">
      <label>Grand Total</label>
      <div class="totals-value" id="cart-total">90.57</div>
    </div>
  </div>
      
      <button class="checkout">Checkout</button>

</div>
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