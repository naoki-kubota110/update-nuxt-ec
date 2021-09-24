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

    <!-- <header class="site-header">
      <div class="site-header__top">
        <div class="wrapper site-header__wrapper">
          <div class="site-header__start">
            <ul class="">
              <li class=""><a href="#">About</a></li>
              <li class=""><a href="#">Contact</a></li>
            </ul>
          </div>
          <div class="site-header__middle">
            <nuxt-link to="/">
              <img src="/ラクラクEC.png" class="header-logo"
            /></nuxt-link>
          </div>
          <div class="site-header__end top">
            <a href="#">Login</a>
            <a href="#" class="button">Some action</a>
          </div>
        </div>
      </div>
      <div class="site-header__bottom">
        <div class="wrapper site-header__wrapper">
          <div class="site-header__start">
            <nav class="nav">
              <button class="nav__toggle" aria-expanded="false" type="button">
                menu
              </button>
              <ul class="nav__wrapper">
                <li class="nav__item">
                  <nuxt-link to="/user/favorite" class="menu-text">
                    <span> <fa :icon="faStar" class="menu-icon" /></span
                    >お気に入り</nuxt-link
                  >
                </li>
                <li class="nav__item">
                  <nuxt-link to="/orders/cart" class="menu-text">
                    <span> <fa :icon="faShoppingCart" class="menu-icon" /></span
                    >カート
                  </nuxt-link>
                </li>
                <li class="nav__item">
                  <nuxt-link to="/orders/history" class="menu-text">
                    <span> <fa :icon="faStickyNote" class="menu-icon" /></span
                    >注文履歴</nuxt-link
                  >
                </li>
                <li class="nav__item"><a href="#">Hire us</a></li>
                <li class="nav__item"><a href="#">Contact</a></li>
              </ul>
            </nav>
          </div>

          <div class="site-header__end bottom">
            <div class="search">
              <button class="search__toggle" aria-label="Open search">
                Search
              </button>
              <form class="search__form" action="">
                <label class="sr-only" for="search">Search</label>
                <input
                  id="search"
                  type="search"
                  name=""
                  placeholder="What's on your mind?"
                />
              </form>
            </div>
            <a href="#" class="cart">
              <svg
                version="1.1"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <title>Cart</title>
                  <path
                    d="m95.398 23.699c-1.8008-2.3008-4.6016-3.6992-7.5-3.6992h-60.898l-1.8984-7.3984c-1.1016-4.3008-4.8984-7.3008-9.3008-7.3008h-10.199c-1.6992 0-3.1016 1.3984-3.1016 3.1016 0 1.6992 1.3984 3.1016 3.1016 3.1016h10.199c1.5 0 2.8008 1 3.1992 2.5l12.199 48.602c1.1016 4.3008 4.8984 7.3008 9.3008 7.3008h39.898c4.3984 0 8.3008-3 9.3008-7.3008l7.5-30.801c0.69922-2.8047 0.10156-5.8047-1.8008-8.1055zm-4.2969 6.6992-7.5 30.801c-0.39844 1.5-1.6992 2.5-3.1992 2.5h-39.902c-1.5 0-2.8008-1-3.1992-2.5l-8.6992-34.898h59.301c1 0 2 0.5 2.6016 1.3008 0.59766 0.79688 0.89453 1.7969 0.59766 2.7969z"
                  />
                  <path
                    d="m42.602 73.898c-5.6992 0-10.398 4.6992-10.398 10.398s4.6992 10.398 10.398 10.398c5.6992 0.003907 10.398-4.6953 10.398-10.395s-4.6992-10.402-10.398-10.402zm0 14.5c-2.3008 0-4.1016-1.8008-4.1016-4.1016s1.8008-4.1016 4.1016-4.1016c2.3008 0 4.1016 1.8008 4.1016 4.1016-0.003906 2.2031-1.9023 4.1016-4.1016 4.1016z"
                  />
                  <path
                    d="m77 73.898c-5.6992 0-10.398 4.6992-10.398 10.398s4.6992 10.398 10.398 10.398 10.398-4.6992 10.398-10.398c-0.097657-5.6953-4.6992-10.398-10.398-10.398zm0 14.5c-2.3008 0-4.1016-1.8008-4.1016-4.1016s1.8008-4.1016 4.1016-4.1016 4.1016 1.8008 4.1016 4.1016c0 2.2031-1.9023 4.1016-4.1016 4.1016z"
                  />
                </g>
              </svg>
            </a>
            <a href="#">
              <svg
                version="1.1"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Profile</title>
                <path
                  d="m65.57 52.5c6.9336-4.5078 11.574-11.797 12.723-19.988 1.1484-8.1875-1.3047-16.473-6.7344-22.715-5.4258-6.2422-13.289-9.8242-21.559-9.8242s-16.133 3.582-21.559 9.8242c-5.4297 6.2422-7.8828 14.527-6.7344 22.715 1.1484 8.1914 5.7891 15.48 12.723 19.988-10.012 3.2812-18.73 9.6406-24.914 18.172-6.1836 8.5273-9.5117 18.793-9.5156 29.328h7.1445c0-15.312 8.168-29.461 21.426-37.117 13.262-7.6523 29.598-7.6523 42.859 0 13.258 7.6562 21.426 21.805 21.426 37.117h7.1445c-0.003906-10.535-3.332-20.801-9.5156-29.328-6.1836-8.5312-14.902-14.891-24.914-18.172zm-37-23.93c0-5.6836 2.2578-11.133 6.2773-15.152 4.0195-4.0156 9.4688-6.2734 15.152-6.2734s11.133 2.2578 15.152 6.2734c4.0195 4.0195 6.2773 9.4688 6.2773 15.152 0 5.6836-2.2578 11.137-6.2773 15.152-4.0195 4.0195-9.4688 6.2773-15.152 6.2773s-11.133-2.2578-15.152-6.2773c-4.0195-4.0156-6.2773-9.4688-6.2773-15.152z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header> -->
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
      // display: initial;
      // display: flex;
      display: none;
      flex-wrap: wrap;
      background-color: red;
    }
  }
}

// ==========================
.brand {
  font-weight: bold;
  font-size: 27px;
}

.site-header__top {
  background-color: #def7ff;
}
.site-header__top ul {
  display: flex;
}
.site-header__top li:not(:last-child) {
  margin-right: 1.5rem;
}
.site-header__top .site-header__start {
  display: none;
}
.site-header__bottom {
  position: relative;
  background-color: #c7f2ff;
}
@media (max-width: 939px) {
  .site-header__bottom .site-header__end {
    order: -1;
  }
}
.site-header__wrapper {
  display: flex;
  justify-content: space-between;
}

.site-header__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}
@media (min-width: 940px) {
  .site-header__wrapper {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
}
.site-header__end {
  display: flex;
  align-items: center;
}

.site-header__end.top > * + * {
  margin-left: 1.5rem;
}

@media (min-width: 940px) {
  .site-header__end.bottom > *:not(:last-child) {
    margin-right: 1.5rem;
  }
}

@media (max-width: 939px) {
  .site-header__end.bottom .cart {
    margin-right: 1.5rem;
  }
}

@media (max-width: 939px) {
  .site-header__end.bottom .search {
    margin-left: 0;
  }
}
.site-header__end.bottom svg {
  width: 22px;
  height: 22px;
}

@media (min-width: 940px) {
  .nav__wrapper {
    display: flex;
  }
}

@media (max-width: 939px) {
  .nav__wrapper {
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    z-index: -1;
    background-color: #d9f0f7;
    visibility: hidden;
    opacity: 0;
    transform: translateY(-100%);
    transition: transform 0.3s ease-out, opacity 0.3s ease-out;
  }
  .nav__wrapper.active {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
  }
}

.nav__item:not(:last-child) {
  margin-right: 1.5rem;
}

.nav__item a {
  display: block;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}
@media (max-width: 939px) {
  .nav__item a {
    padding: 1rem;
  }
}
.nav__item svg {
  display: inline-block;
  vertical-align: middle;
  width: 28px;
  height: 28px;
  margin-right: 1rem;
}
@media (min-width: 940px) {
  .nav__item svg {
    display: block;
    margin: 0 auto 0.5rem;
  }
}
.nav__item.active a {
  border-left-color: #222;
}
@media (min-width: 800px) {
  .nav__item.active a {
    border-bottom-color: #222;
  }
}
.nav__toggle {
  position: absolute;
  right: 1rem;
  top: 1rem;
}
@media (min-width: 940px) {
  .nav__toggle {
    display: none;
  }
}
.search {
  display: flex;
}
.search__toggle {
  appearance: none;
  order: 1;
  font-size: 0;
  width: 34px;
  height: 34px;
  // background: url('../img/header-3/search.svg') center/22px no-repeat;
  border: 0;
}
@media (max-width: 939px) {
  .search__toggle {
    position: absolute;
    right: 5.5rem;
    top: 0.65rem;
  }
}
// .search__toggle.active {
//   // background: url('../img/header-5/close.svg') center/22px no-repeat;
// }

.search__form {
  display: none;
}
.search__form.active {
  display: block;
}
@media (max-width: 799px) {
  .search__form {
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    background-color: red;
  }
  .search__form input {
    width: 100%;
  }
}
.search__form input {
  min-width: 200px;
  appearance: none;
  border: 0;
  background-color: #fff;
  border-radius: 0;
  font-size: 16px;
  padding: 0.5rem;
}
@media (max-width: 799px) {
  .search__form input {
    border-bottom: 1px solid #979797;
  }
}
</style>
