<template>
  <header>
    <h1 class="title">
      <nuxt-link to="/">
        <img src="/ラクラクEC.png" class="header-logo" />
      </nuxt-link>
            <input
            v-model="searchWord"
            class="search-box"
            type="text"
            placeholder="商品を検索"
          />
          <button class="search-btn" type="submit" @click="searchItem">
            <fa :icon="faSearch" class="search-icon" />
          </button>
    </h1>
<!-- 
    <nav class="nav">
      <ul class="menu-group">
        <li class="menu-search">
          <input
            v-model="searchWord"
            class="search-box"
            type="text"
            placeholder="商品を検索"
          />
          <button class="search-btn" type="submit" @click="searchItem">
            <fa :icon="faSearch" class="search-icon" />
          </button>
        </li>
        <li v-if="!$auth.loggedIn" class="menu-item">
          <nuxt-link to="/user/login"> ログイン </nuxt-link>
          <nuxt-link to="/user/register">ユーザー登録</nuxt-link>
        </li>
        <li v-if="$auth.loggedIn" class="menu-item">
          <button @click="logout">Logout</button>
        </li>
        <li class="menu-item">
          <nuxt-link to="/user/favorite">
            <span> <fa :icon="faStar" class="menu-icon" /></span
            >お気に入り</nuxt-link
          >
        </li>
        <li class="menu-item">
          <nuxt-link to="/orders/cart">
            <span> <fa :icon="faShoppingCart" class="menu-icon" /></span>カート
          </nuxt-link>
        </li>
        <li class="menu-item">
          <nuxt-link to="/orders/history">
            <span> <fa :icon="faStickyNote" class="menu-icon" /></span
            >注文履歴</nuxt-link
          >
        </li>
      </ul>
    </nav> -->
  </header>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import {
  faSearch,
  faStar,
  faShoppingCart,
  faStickyNote,
} from '@fortawesome/free-solid-svg-icons'
import config from '../config'

export default {
  data() {
    return {
      searchWord: '',
      searchedItems: '',
    }
  },
  computed: {
    faSearch() {
      return faSearch
    },
    faStar() {
      return faStar
    },
    faShoppingCart() {
      return faShoppingCart
    },
    faStickyNote() {
      return faStickyNote
    },
  },
  created() {
    if (this.$store.state.item.itemflg === true) {
      const apiKey = config.RAKUTEN_API_KEY
      axios
        .get(
          'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706',
          {
            params: {
              applicationId: apiKey,
              keyword: 'スーパーセール',
              hits: 30,
            },
          }
        )
        .then((response) => {
          this.searchedItems = response.data
          this['item/searchItem'](response.data.Items)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      const apiKey = config.RAKUTEN_API_KEY
      axios
        .get(
          'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706',
          {
            params: {
              applicationId: apiKey,
              keyword: this.searchWord,
              hits: 30,
            },
          }
        )
        .then((response) => {
          this.searchedItems = response.data
          this['item/searchItem'](response.data.Items)
          this.$store.commit('item/flgChange')
          this.$router.push('/')
        })

        .catch((err) => {
          console.log(err)
        })
    }
  },

  methods: {
    logout() {
      if (confirm('本当にログアウトしますか？')) {
        this.$auth.logout()
      }
    },
    searchItem() {
      const apiKey = config.RAKUTEN_API_KEY
      if (this.searchWord !== '') {
        this.searchedItems = ''
        axios
          .get(
            'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706',
            {
              params: {
                applicationId: apiKey,
                keyword: this.searchWord,
                hits: 30,
              },
            }
          )
          .then((response) => {
            this.searchedItems = response.data
            
            this['item/searchItem'](response.data.Items)
            this.$store.commit('item/flgChange')
            this.$router.push('/')
          })

          .catch((err) => {
            console.log(err)
          })
      }
    },
    ...mapActions(['item/searchItem']),
  },
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  width: 100%;
  height: 100px;
  background-color: #eee;
  align-items: center;
}
.title {
  margin-right: auto;
}

.menu-item {
  list-style: none;
  display: inline-block;
  padding: 10px;
}
.menu-search {
  list-style: none;
  display: inline-block;
  padding: 350px;
}
.search-box {
  height: 35px;
  width: 200px;
  // padding: 0 10px;
  // position: absolute;
  // left: 0;
  // top: 0;
  border-radius: 25px;
  outline: 0;
  background: white;
  padding-left: 20px;
}
.search-btn {
  height: 40px;
  width: 50px;
  // position: absolute;
  // left: 250px;
  // top: 0;
  background: #7fbfff;
  color: #fff;
  border: none;
  border-radius: 0 25px 25px 0;
}
.search-btn:hover {
  background-color: #6699ff;
}
// .search-btn .fa-search {
//   font-size: 20px;
//   position: absolute;
//   top: 30%;
//   left: 30%;
// }
.search-btn:hover {
  color: #888;
}
.search-icon {
  color: white;
}
.header-logo {
  height: 90px;
  width: 120px;
  margin-left: 5px;
  margin-top: 10px;
}
.menu-icon {
  padding-right: 5px;
}
</style>
