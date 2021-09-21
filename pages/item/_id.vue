<template>
  <div>
    <h1>商品詳細</h1>
    <ul class="itemList">
      <li v-for="item in selectedItem" :key="item.Item.itemCode">
        <p class="item-name">
          <span class="text-bold">商品名：</span>{{ item.Item.itemName }}
        </p>

        <div class="img-position">
          <span>
            <img
              :src="item.Item.mediumImageUrls[0].imageUrl"
              class="item-img"
            />
          </span>
          <span class="cost-position">
            <p class="item-cost">
              <span class="text-bold">価格：</span
              >{{ [item.Item.itemPrice].toLocaleString() }}円(税込)
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
              {{ [item.Item.itemPrice * value].toLocaleString() }}円(税込)
            </p>
          </span>
          <span class="cost-position">
            <p>
              <button class="addcart-btn" @click="addCart">
                <span> <fa :icon="faShoppingCart" class="menu-icon" /></span
                ><span>カートに入れる</span></button
              ><br />
              <button class="addfavorite-btn" @click="toggleFavorite">
                <span> <fa :icon="faStar" class="menu-icon" /></span
                ><span>お気に入りへ追加</span>
              </button>
            </p>
          </span>
        </div>

        <span class="item-detail">
          <p>
            <span class="text-bold">商品詳細：</span>{{ item.Item.itemCaption }}
          </p>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import { faShoppingCart, faStar } from '@fortawesome/free-solid-svg-icons'
import config from '../../config'
export default {
  data() {
    return {
      value: 1,
      selectedItem: '',
    }
  },
  computed: {
    faShoppingCart() {
      return faShoppingCart
    },
    faStar() {
      return faStar
    },
  },
  mounted() {
    const apiKey = config.RAKUTEN_API_KEY
    axios
      .get(
        'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706',
        {
          params: {
            applicationId: apiKey,
            itemCode: this.$route.params.id,
          },
        }
      )
      .then((response) => {
        this.selectedItem = response.data.Items
      })
      .catch((err) => {
        console.log(err)
      })
  },
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
    toggleFavorite() {
      console.log('お気に入り追加')
    },
    ...mapActions(['order/getOrders', 'order/newCart', 'order/addCart']),
  },
}
</script>

<style lang="scss" scoped>
$hover_color: #6699ff;
$border_color: #000080;

h1 {
  text-align: center;
  margin: 50px 0 30px 0;
}
li {
  list-style: none;
  border-top: 1px solid $border_color;
  border-right: 1px solid $border_color;
  border-left: 1px solid $border_color;
  border-bottom: 1px solid $border_color;
  margin: 10px 300px 0 300px;
  padding: 0 30px 0 30px;
  background: #eee;
  font-size: 18px;
}
.item-detail {
  display: flex;
  flex-wrap: wrap;
}
.menu-icon {
  padding-right: 5px;
}
.addcart-btn {
  height: 40px;
  width: 160px;
  background: #7fbfff;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: $hover_color;
  }
}
.addfavorite-btn {
  height: 40px;
  width: 160px;
  background: #7fbfff;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: $hover_color;
  }
}
.img-position {
  display: flex;
  flex-wrap: wrap;
  margin-left: 200px;
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
}
.item-img {
  height: 160px;
  width: 160px;
}
</style>
