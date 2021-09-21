<template>
  <div>
    <h1>注文履歴</h1>
  <div v-if="historyLength !== 0">
  <div class="column-labels">
    <label class="product-image">お届け先</label>
    <label class="product-details">注文情報</label>
  </div>

  <div v-for="item in historyArray" :key="item._id" class="product">
    <div v-for="info in item.itemInfo" :key="info._id" class="product-details">
      <img :src="info.itemImage" class="product-image">
        <router-link :to="{ path: `/item/${info.itemId}` }">
        <p class="product-name">{{ info.itemName }}</p>
        </router-link>
        <div class="product-content">
          ￥{{ info.itemPrice.toLocaleString() }}
        ×{{info.buyNum}}個
        <br>
        合計：￥{{(info.itemPrice * info.buyNum).toLocaleString()}}
        </div>
      </div>
    <div class="product-menu">
      <div>お届け先情報</div>
      <div>{{item.orderInfo.destinationName}}</div>
      <div>〒{{item.orderInfo.destinationZipcode}}</div>
      <div>{{item.orderInfo.destinationAddress}}</div>
      <div>{{item.orderInfo.destinationTel}}</div>
      <div>配達予定時刻</div>
      <div>{{item.orderInfo.destinationDate}}</div>
      <div v-if="item.status === 9" class="cancel-order">
          <button><del>キャンセル済み</del></button>
      </div>
      <div v-else>
        <button @click="cancelOrder(item.orderId)">キャンセルする</button>
       </div>
      <!-- <button @click="cancelOrder(item.orderId)">キャンセルする</button> -->
    </div>
   </div>
    </div>
    <div v-else>
      <h1>カートが空です</h1>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  middleware({ store, redirect }){
    if(!store.$auth.loggedIn){
      redirect('/user/login');
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
      alert("ご注文をキャンセルしますか？")
      this["order/cancelOrder"](id)
    },
    ...mapActions([
      'order/getOrders',
      'order/cancelOrder'
    ]),
  }
}
</script>

<style lang="scss" scoped>
/* Global settings */
$color-border: #eee;
$color-label: #aaa;
$font-default: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, sans-serif;
$font-bold: 'HelveticaNeue-Medium', 'Helvetica Neue Medium';


/* Global "table" column settings */
.product-menu { float: right; width: 40%; margin: 0 auto;}
.product-details { float: left; width: 60%;}

/* This is used as the traditional .clearfix class */
// .group:before,
// .group:after {
//     content: '';
//     display: table;
// } 
// .group:after {
//     clear: both;
// }
// .group {
//     zoom: 1;
// }

/* Apply clearfix in a few places */
// .shopping-cart, .column-labels, .product, .totals-item {
//   @extend .group;
// }

/* Apply dollar signs */
// .product .product-price:before, .product .product-line-price:before, .totals-value:before {
//   content: '￥';
// }

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
    padding-bottom: 15px;
    margin-bottom: 15px;
    margin-top: 50px;
    border-bottom: 1px solid $color-border;
}


/* Product entries */
.product {
  .product-details {
    border-bottom: 1px solid $color-border;
    .product-name{
      padding-left: 50px;
    }
    .product-title {
      margin-right: 20px;
      font-family: $font-bold;
    }
    .product-image {
      width: 100px;
      float: left;
      margin-top: 10px;
      margin-right: 20px;
    }
    .product-content {
      float: right;
    }
  }
  .product-menu {
    text-align: center;
  }

}


/* Make adjustments for tablet */
@media screen and (max-width: 650px) {
  h1{
    font-size: 20px;
    font-weight: $font-bold;
  }
  .column-labels {
    display: none;
  }
.product {
  .product-menu { 
    width: 100%; 
    }
    .product-details { 
    width: 100%; 
     .product-name {
       font-size: 10px;
     }
    }
}
}
</style>