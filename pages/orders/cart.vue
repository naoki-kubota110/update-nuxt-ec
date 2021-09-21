<template>
  <div>
  <h1>ショッピングカート画面</h1>
  <div v-if="cartLength !== 0">
  <div class="shopping-cart">
  <div class="column-labels">
    <label class="product-image">Image</label>
    <label class="product-details">Product</label>
    <label class="product-price">価格</label>
    <label class="product-quantity">数量</label>
    <label class="product-removal">削除</label>
    <label class="product-line-price">合計</label>
  </div>

  <div v-for="item in cartData.itemInfo" :key="item._id" class="product">
    <div class="product-image">
      <img :src="item.itemImage">
    </div>
    <div class="product-details">
      <div class="product-title">{{ item.itemName }}</div>
      <!-- <p class="product-description">The best dog bones of all time. Holy crap. Your dog will be begging for these things! I got curious once and ate one myself. I'm a fan.</p> -->
    </div>
    <div class="product-price">{{ item.itemPrice.toLocaleString() }}</div>
    <div class="product-quantity">
      {{item.buyNum}}個
    </div>
    <div class="product-removal">
      <button class="remove-product" @click="deleteItem(item.itemId)">削除</button>
    </div>
    <div class="product-line-price">{{ (item.itemPrice * item.buyNum).toLocaleString() }}</div>
   </div>
  <div class="totals">
    <div class="totals-item totals-item-total">
      <label>注文合計金額</label>
      <div id="cart-total" class="totals-value">{{ CartSumPrice.toLocaleString() }}</div>
    </div>
    <div class="totals-item">
      <label>内消費税(10%)</label>
      <div id="cart-tax" class="totals-value">{{ Math.floor((CartSumPrice  * 0.1 / 1.1).toLocaleString())}}</div>
    </div>
  </div>
      <button class="checkout">注文に進む</button>
</div>
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
  methods: {
    deleteItem(id) {
      console.log(id,"delete Item")
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

<style lang="scss" scoped>
/* Global settings */
$color-border: #eee;
$color-label: #aaa;
$font-default: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, sans-serif;
$font-bold: 'HelveticaNeue-Medium', 'Helvetica Neue Medium';


/* Global "table" column settings */
.product-image { float: left; width: 20%; }
.product-details { float: left; width: 37%; }
.product-price { float: left; width: 12%; }
.product-quantity { float: left; width: 10%; }
.product-removal { float: left; width: 9%; }
.product-line-price { float: left; width: 12%; text-align: right; }

/* This is used as the traditional .clearfix class */
.group:before,
.group:after {
    content: '';
    display: table;
} 
.group:after {
    clear: both;
}
.group {
    zoom: 1;
}

/* Apply clearfix in a few places */
.shopping-cart, .column-labels, .product, .totals-item {
  @extend .group;
}

/* Apply dollar signs */
.product .product-price:before, .product .product-line-price:before, .totals-value:before {
  content: '￥';
}

/* Body/Header stuff */
body {
  padding: 0px 30px 30px 20px;
  font-family: $font-default;
  font-weight: 100;
}

h1 {
  font-weight: 100;
}

label {
  color: $color-label;
}

.shopping-cart {
  margin-top: -45px;
}


/* Column headers */
.column-labels {
  label {
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid $color-border;
  }
  
  .product-image, .product-details, .product-removal {
    text-indent: -9999px;
  }
}


/* Product entries */
.product {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid $color-border;
  
  .product-image {
    text-align: center;
    img {
      width: 100px;
    }
  }
  
  .product-details {
    .product-title {
      margin-right: 20px;
      font-family: $font-bold;
    }
    .product-description {
      margin: 5px 20px 5px 0;
      line-height: 1.4em;
    }
  }
  
  .product-quantity {
    input {
      width: 40px;
    }
  }
  
  .remove-product {
    border: 0;
    padding: 4px 8px;
    background-color: #c66;
    color: #fff;
    font-family: $font-bold;
    font-size: 12px;
    border-radius: 3px;
  }
  
  .remove-product:hover {
    background-color: #a44;
  }
}


/* Totals section */
.totals {
  .totals-item {
    float: right;
    clear: both;
    width: 100%;
    margin-bottom: 10px;
    
    label {
      float: left;
      clear: both;
      width: 79%;
      text-align: right;
    }
    
    .totals-value {
      float: right;
      width: 21%;
      text-align: right;
    }
  }
  
  .totals-item-total {
    font-family: $font-bold;
  }
}

.checkout {
  float: right;
  border: 0;
  margin-top: 20px;
  padding: 6px 25px;
  background-color: #6b6;
  color: #fff;
  font-size: 25px;
  border-radius: 3px;
}

.checkout:hover {
  background-color: #494;
}

/* Make adjustments for tablet */
@media screen and (max-width: 650px) {
  
  .shopping-cart {
    margin: 0;
    padding-top: 20px;
    border-top: 1px solid $color-border;
  }
  
  .column-labels {
    display: none;
  }
  
  .product-image {
    float: right;
    width: auto;
    img {
      margin: 0 0 10px 10px;
    }
  }
  
  .product-details {
    float: none;
    margin-bottom: 10px;
    width: auto;
  }
  
  .product-price {
    clear: both;
    width: 70px;
  }
  
  .product-quantity {
    width: 100px;
    input {
      margin-left: 20px;
    }
  }
  
  .product-quantity:before {
    content: 'x';
  }
  
  .product-removal {
    width: auto;
  }
  
  .product-line-price {
    float: right;
    width: 70px;
  }

}


/* Make more adjustments for phone */
@media screen and (max-width: 350px) {
  .product-removal {
    float: right;
  }
  
  .product-line-price {
    float: right;
    clear: left;
    width: auto;
    margin-top: 10px;
  }
  
  .product .product-line-price:before {
    content: 'Item Total: $';
  }
  
  .totals {
    .totals-item {
      label {
        width: 60%;
      }
      
      .totals-value {
        width: 40%;
      }
    }
  }
}
</style>