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
        <li v-if="!$store.state.auth.loggedIn" class="menu-item">
          <nuxt-link to="/user/login">
            <button class="log-btn">
              <span> <fa :icon="faLockOpen" class="menu-icon" /></span>ログイン
            </button>
          </nuxt-link>
          <nuxt-link to="/user/register">ユーザー登録</nuxt-link>
        </li>
        <li v-if="$store.state.auth.loggedIn" class="menu-item">
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
      <!--ハンバーガーメニューのボタン-->
      <div class="hamburger__btn" @click="ActiveBtn = !ActiveBtn">
        <span class="line line_01" :class="{ btn_line01: ActiveBtn }"></span>
        <span class="line line_02" :class="{ btn_line02: ActiveBtn }"></span>
        <span class="line line_03" :class="{ btn_line03: ActiveBtn }"></span>
      </div>
      <!--サイドメニュー-->
      <transition name="hamburger__menu">
        <div v-show="ActiveBtn" class="hamburger__menu">
          <ul>
            <li v-if="!$store.state.auth.loggedIn" class="menu-item">
              <nuxt-link to="/user/login">
                <button class="log-btn">
                  <span> <fa :icon="faLockOpen" class="menu-icon" /></span
                  >ログイン
                </button>
              </nuxt-link>
              <nuxt-link to="/user/register">ユーザー登録</nuxt-link>
            </li>
            <li v-if="$store.state.auth.loggedIn" class="menu-item">
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
                <span> <fa :icon="faShoppingCart" class="menu-icon" /></span
                >カート
              </nuxt-link>
            </li>
            <li class="menu-item-last">
              <nuxt-link to="/orders/history" class="menu-text">
                <span> <fa :icon="faStickyNote" class="menu-icon" /></span
                >注文履歴</nuxt-link
              >
            </li>
          </ul>
        </div>
      </transition>
    </header>
    <!-- ＝＝＝Vue-burger-menuでのハンバーガーメニュー実装 → SSR時にエラー＝＝ -->
    <!-- <client-only>
      <slide right class="phone-menu">
        <nuxt-link to="/user/favorite" class="menu-text">
          <span> お気に入り</span></nuxt-link
        >
        <nuxt-link to="/orders/cart" class="menu-text">
          <span>カート</span>
        </nuxt-link>
        <nuxt-link to="/orders/history" class="menu-text">
          <span>注文履歴</span></nuxt-link
        >
      </slide>
    </client-only> -->
    <!-- ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝-->
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
      ActiveBtn: false,
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
$button_bg_color: #7fbfff;

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
    padding: 10px;
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
    background-color: $button_bg_color;
    color: #fff;
    border: none;
    border-radius: 0 25px 25px 0;
    cursor: pointer;
    &:hover {
      background-color: $hover_color;
    }
  }
  button.log-btn {
    background-color: $button_bg_color;
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
      position: absolute;
      top: 80px;
      left: 33%;
      display: flex;
    }
    input.search-box {
      height: 30px;
      width: 140px;
      margin-left: 10px;
      display: inline-block;
    }
    button.search-btn {
      height: 35px;
      width: 35px;
      margin-left: 5px;
      margin-left: 5px;
    }

    button.log-btn {
      font-size: 22px;
      padding: 1px;
      margin-left: 12px;
    }

    .menu-icon {
      padding-right: 5px;
      display: flex;
      font-size: 18px;
      display: none;
    }
    .menu {
      display: flex;
      display: none;
      flex-wrap: wrap;
    }

    .hamburger__btn {
      position: absolute;
      top: 10px;
      right: 100px;
      cursor: pointer;
      z-index: 50;

      .line {
        position: absolute;
        top: 0;
        left: 20px;
        width: 45px;
        height: 2px;
        background: #333333;
        text-align: center;
      }

      .line_01 {
        top: 16px;
        transition: 0.4s ease;
      }

      .line_02 {
        top: 26px;
        transition: 0.4s ease;
      }

      .line_03 {
        top: 36px;
        transition: 0.4s ease;
      }
    }

    .btn_line01 {
      transform: translateY(10px) rotate(-45deg);
      transition: 0.4s ease;
    }
    .btn_line02 {
      transition: 0.4s ease;
      opacity: 0;
    }
    .btn_line03 {
      transform: translateY(-10px) rotate(45deg);
      transition: 0.4s ease;
    }
    // サイドメニュー
    .hamburger__menu-enter-active,
    .hamburger__menu-leave-active {
      transition: opacity 0.4s;
    }
    .hamburger__menu-enter,
    .hamburger__menu-leave-to {
      opacity: 0;
    }
    .hamburger__menu-leave,
    .hamburger__menu-enter-to {
      opacity: 1;
    }

    .hamburger__menu {
      background-color: rgba(197, 197, 197, 0.671);
      z-index: 30;
      padding: 2rem 1rem;
      position: fixed;
      width: 200px;
      height: 80rem;
      top: 0;
      right: 0;

      ul {
        padding: 0;
        padding-top: 40px;
      }

      li {
        padding: 20px 0;
        list-style: none;
        line-height: 1;
      }

      a {
        color: rgb(66, 66, 66);
        text-decoration: none;
        font-size: 22px;
        margin: 0 4vw;
        padding-bottom: 8px;
      }
    }
  }
}
</style>
