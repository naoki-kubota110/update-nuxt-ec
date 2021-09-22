<template>
  <div>
    <header>
      <h1 class="title">
        <nuxt-link to="/">
          <img src="/ラクラクEC.png" class="header-logo" />
        </nuxt-link>
      </h1>

      <div>
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
      </div>
      <!-- ログイン状態:{{ $auth.loggedIn }} | {{ $auth.user }} -->
      <span class="menu">
        <li v-if="!$auth.loggedIn" class="menu-item">
          <nuxt-link to="/user/login">
            <button class="log-btn">
              <span> <fa :icon="faLockOpen" class="menu-icon" /></span>ログイン
            </button>
          </nuxt-link>
          <nuxt-link to="/user/register">ユーザー登録</nuxt-link>
        </li>
        <li v-if="$auth.loggedIn" class="menu-item">
          <button class="log-btn" @click="logout">
            <span> <fa :icon="faLock" class="menu-icon" /></span>ログアウト
          </button>
        </li>
        <li class="menu-item">
          <nuxt-link to="/user/favorite" class="menu-text">
            <span> <fa :icon="faStar" class="menu-icon" /></span
            >お気に入り</nuxt-link
          >
        </li>
        <li class="menu-item">
          <nuxt-link to="/orders/cart" class="menu-text">
            <span> <fa :icon="faShoppingCart" class="menu-icon" /></span>カート
          </nuxt-link>
        </li>
        <li class="menu-item-last">
          <nuxt-link to="/orders/history" class="menu-text">
            <span> <fa :icon="faStickyNote" class="menu-icon" /></span
            >注文履歴</nuxt-link
          >
        </li>
      </span>
    </header>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import {
  faSearch,
  faStar,
  faShoppingCart,
  faStickyNote,
  faLock,
  faLockOpen,
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
    faLock() {
      return faLock
    },
    faLockOpen() {
      return faLockOpen
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
            console.log(response.data)
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
$hover_color: #6699ff;

header {
  display: flex;
  width: 100%;
  height: 100px;
  background-color: #eee;
  align-items: center;
  justify-content: space-between;

  h1.title {
    .header-logo {
      height: 90px;
      width: 120px;
      margin-left: 5px;
      margin-top: 10px;
    }
  }
  li {
    .menu-text {
      &:hover {
        color: $hover_color;
      }
    }
  }

  li.menu-item {
    list-style: none;
    display: inline-block;
    padding: 10px;
  }
  li.menu-item-last {
    list-style: none;
    display: inline-block;
    padding: 10px 10px 10px 10px;
  }
  li.menu-search {
    list-style: none;
    display: inline-block;
  }
  input.search-box {
    height: 35px;
    width: 200px;
    border-radius: 25px;
    outline: 0;
    background-color: white;
    padding-left: 20px;
  }
  button.search-btn {
    height: 40px;
    width: 50px;
    background-color: #7fbfff;
    color: #fff;
    border: none;
    border-radius: 0 25px 25px 0;
    cursor: pointer;
    &:hover {
      background-color: $hover_color;
    }
  }
  button.log-btn {
    background-color: #7fbfff;
    border-width: 1px;
    padding: 5px;
    cursor: pointer;
    &:hover {
      background-color: $hover_color;
    }
  }
  .search-icon {
    color: white;
  }
  .menu-icon {
    padding-right: 5px;
  }
  .menu {
    display: inline-block;
    text-align: right;
    margin-right: 10px;
  }
}

// タブレット対応
@media screen and (max-width: 1024px) {
  header {
    font-size: 12px;
    h1.title {
      .header-logo {
        height: 90px;
        width: 80px;
        margin-left: 5px;
        margin-top: 5px;
      }
    }
    li.menu-item {
      padding: 5px;
    }
    input.search-box {
      font-size: 12px;
      height: 30px;
      width: 150px;
    }
    button.search-btn {
      height: 30px;
      width: 30px;
      font-size: 12px;
    }
    button.log-btn {
      font-size: 12px;
      padding: 1px;
    }
    .menu-icon {
      padding-right: 1px;
    }
  }
}
// スマホ対応
@media screen and (max-width: 650px) {
  header {
    width: 100%;
    height: 180px;
    background-color: #eee;
    align-items: center;
    justify-content: initial;

    h1.title {
      .header-logo {
        height: 90px;
        width: 100px;
        margin: 0 0 0 5px;
        display: inline-block;
      }
    }
    li.menu-search {
      display: flex;
    }
    input.search-box {
      height: 30px;
      width: 150px;
      margin-left: 10px;
      display: inline-block;
    }
    button.search-btn {
      height: 35px;
      width: 40px;
      margin-left: 5px;
      margin-left: 5px;
    }
    button.log-btn {
      padding: 5px;
    }
    .menu-icon {
      padding-right: 5px;
      display: flex;
    }
    .menu {
      display: initial;
      display: none;
      flex-wrap: wrap;
      background-color: red;
    }
  }
}
</style>
