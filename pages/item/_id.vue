<template>
  <div class="container">
    <h1>商品詳細</h1>
    <ul class="itemList">
      <li>
        <p class="item-name">
       {{ itemDetail.itemName }}
        </p>
        <div class="img-position">
            <img
              :src="itemDetail.itemImage"
              class="item-img"
            />
          <span class="cost-position">
            <p class="item-cost">
              <span class="text-bold">価格：</span
              >{{ itemDetail.itemPrice }}円(税込)
            </p>
            <p>
              <span class="text-bold"> 数量：</span>
              <select v-model="value">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </p>
            <p>
              <span class="text-bold"> 合計：</span>
              {{ (itemDetail.itemPrice * value) }}円(税込)
            </p>
          </span>
          <span class="cost-position">
              <button class="button-design" @click="addCart">
                 <fa :icon="faShoppingCart" class="menu-icon" /><span>カートに入れる</span>
                 </button>
                 <br />
              <button class="button-design" @click="addFavorite">
                <span> <fa :icon="faStar" class="menu-icon" /></span
                ><span>お気に入りへ追加</span>
              </button>
          </span>
        </div>
        <span class="item-detail">
          <div class="box">
            <p class="item-caption"></p>{{ itemDetail.itemCaption }}
          </div>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { faShoppingCart, faStar } from '@fortawesome/free-solid-svg-icons'
export default {
  data() {
    return {
      value: 1,
    }
  },
  computed: {
    faShoppingCart() {
      return faShoppingCart
    },
    faStar() {
      return faStar
    },
    itemDetail() {
      return this.$store.state.item.itemDetail
    }
  },
  mounted() {
    console.log("itemDetail")
    this['item/fetchItemDetail'](this.$route.params.id)
  },
  beforeDestroy(){
    this['item/deleteItemDetail']()
  },
  methods: {
    addCart() {
      if (this.$store.state.auth.loggedIn) {
      const item = {
        orderId: new Date().getTime().toString(),
        status: 0,
        // userId: this.$auth.user.id,
        userId: this.$store.state.auth.user.id,
        addCartDate: new Date().toString(),
        itemInfo: [
          {
            itemId: this.itemDetail.itemId,
            itemName: this.itemDetail.itemName,
            itemPrice: this.itemDetail.itemPrice,
            itemImage: this.itemDetail.itemImage,
            buyNum: this.value,
          },
        ],
      }
      // ユーザーのオーダー配列が空（まだ一回もカートに入れたことがない）、またはカートに入れているが注文は実行していない場合
      if (this.$store.getters['order/CartDataArry'].length === 0) {
        if (confirm('カートに追加しますか？')){
          this['order/newCart'](item)
        }
        // ユーザーのオーダー配列にstatusが０のオブジェクトがある
      } else {
        const payload = {
          orderId: this.$store.getters['order/CartDataArry'][0].orderId,
          itemId: this.itemDetail.itemId,
          itemName: this.itemDetail.itemName,
          itemPrice: this.itemDetail.itemPrice,
          itemImage: this.itemDetail.itemImage,
          buyNum: this.value,
        }
        if (confirm('カートに追加しますか？')) {
         this['order/addCart'](payload)
        }
      }
      }else {
        alert('カートに追加するにはログインしてください')
        this.$router.push('/user/login')
      }
    },
    addFavorite() {
      if (this.$store.state.auth.loggedIn){
        const favoriteItem = {
          favoriteId: new Date().getTime().toString(),
        // userId: this.$auth.user.id,
        userId: this.$store.state.auth.user.id,
        itemInfo: [
          {
            itemId: this.itemDetail.itemId,
            itemName: this.itemDetail.itemName,
            itemPrice: this.itemDetail.itemPrice,
            itemImage: this.itemDetail.itemImage,
          },
        ],
      }
        if (confirm('お気に入りに追加しますか？')) {
          this['users/addFavoriteItem'](favoriteItem)
        }
        }else{
        alert('お気に入りに追加するにはログインしてください')
        this.$router.push('/user/login')
        }
    },
    ...mapActions([
      'order/getOrders',
      'order/newCart',
      'order/addCart',
      'users/addFavoriteItem',
      "item/fetchItemDetail",
      "item/deleteItemDetail",
    ]),
  },
}
</script>

<style lang="scss" scoped>

$hover_color: black;
$border_color: black;

.box  {overflow: hidden;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 5;/*行数を指定*/}

.container{
  margin: 50px auto;
  width: 80%;
  overflow: hidden
}
h1 {
  text-align: center;
}
li {
  list-style: none;
  border-top: 1px solid $border_color;
  border-right: 1px solid $border_color;
  border-left: 1px solid $border_color;
  border-bottom: 1px solid $border_color;
  margin: 10px 100px 0 100px;
  padding: 0 10px 0 10px;
  background: #fff;
  font-size: 18px;
}
.item-detail {
  display: flex;
  flex-wrap: wrap;
}
.menu-icon {
  padding-right: 5px;
}
.button-design {
  color:#fff;
  height: 40px;
  width: 160px;
  background: #bf0000;
  cursor: pointer;
  margin: 20px auto;
  &:hover {
    font-weight: bold;
  }
}
.img-position {
  display: flex;
  flex-wrap: wrap;
  text-align: left;
  margin-left:40px;
}
.cost-position {
  margin-left: 50px;
}
.item-detail {
  margin: 30px 0 10px 0;
  padding-top: 30px;
  padding-bottom: 30px;
  border-top: 1px solid $border_color;
}
.item-name {
  margin: 30px 0 30px 0;
  padding-bottom: 30px;
  border-bottom: 1px solid $border_color;
}
.text-bold {
  font-weight: 900;
      overflow: hidden;
  position: relative;
  word-wrap: break-word;

}
.item-img {
  height: 160px;
  width: 160px;
}

@media screen and (max-width: 1024px) {
  li {
    margin: 10px 20px 0 20px;
    font-size: 16px;
  }
  .img-position {
    margin: 0;
  }
  .addcart-btn {
    width: 150px;
  }
  .addfavorite-btn {
    width: 150px;
  }
  .cost-position {
    margin-left: 20px;
  }
  .addcart-btn {
    margin-top: 0px;
  }
}

@media screen and (max-width: 650px) {

.container{
  width: 100%;
}
  li {
    margin: 0 30px;
    font-size: 14px;
  }
  .addcart-btn {
    height: 35px;
    width: 130px;
    font-size: 12px;
  }
  .addfavorite-btn {
    height: 35px;
    width: 130px;
    font-size: 12px;
  }
  .menu-icon {
    padding-right: 3px;
  }
}
</style>
