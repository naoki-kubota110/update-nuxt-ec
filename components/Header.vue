<template>
    <header class="site-header">
      <div class="site-header__top">
        <div class="wrapper site-header__wrapper">
          <div class="site-header__middle">
            <router-link to="/" class="header_title">
             <div class="brand">RAKURAKU EC</div>
            </router-link>
          </div>
          <div v-if="!loginStatus" class="site-header__end top">
            <router-link to="/user/login">
              <div class="button-18">ログイン</div>
            </router-link>
          </div>
          <div v-else class="site-header__end top">
            <div class="user_name">{{loginUserName}}</div>
            <div class="button-18" @click="logout">ログアウト</div>
          </div>
        </div>
      </div>

      <div class="site-header__bottom">
        <div class="wrapper site-header__wrapper">
          
          <div class="site-header__start">
            <nav class="nav">
              <input 
              v-model="searchWord" 
              class="form1-input" 
              placeholder="商品を検索"/>
              <fa  class="cart" :icon="faSearch" @click="searchItem"/>
            </nav>
          </div>

          <div class="site-header__end bottom">
              <router-link to="/" class="link_item">
                <fa :icon="faUser"/>
                <div class="icon_text">ユーザー</div>
             </router-link>
              <router-link to="/orders/cart" class="link_item">
                <fa :icon="faShoppingCart"/>
                <div class="icon_text">カート</div>
             </router-link>
              <router-link to="user/favorite" class="link_item">
                <fa :icon="faStar"/>
                <div class="icon_text">お気に入り</div>
             </router-link>
              <router-link to="orders/history" class="link_item">
                <fa :icon="faStickyNote"/>
                <div class="icon_text">注文履歴</div>
             </router-link>
          </div>
          
        </div>

      </div>
    </header>
</template>

<script>
// import axios from 'axios'
import { mapActions } from 'vuex'

import {
  faSearch,
  faStar,
  faShoppingCart,
  faStickyNote,
  faLock,
  faLockOpen,
  faUser,
} from '@fortawesome/free-solid-svg-icons'

export default {
  data() {
    return {
      searchWord: '',
      searchedItems: '',
      ActiveBtn: false,
    }
  },
  computed: {
    loginStatus(){
      return this.$store.state.auth.loggedIn
    },
    loginUserName(){
      return this.$store.state.auth.user.name
    },
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
    faUser() {
      return faUser
    },
  },
  // created() {
  //   if (this.$store.state.item.itemflg === true) {
  //     const apiKey = '1083744313894679387'
  //     axios
  //       .get(
  //         'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706',
  //         {
  //           params: {
  //             applicationId: apiKey,
  //             keyword: 'スーパーセール',
  //             hits: 30,
  //           },
  //         }
  //       )
  //       .then((response) => {
  //         this.searchedItems = response.data
  //         this['item/searchItem'](response.data.Items)
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //       })
  //   }
  // },

  methods: {
    logout() {
      if (confirm('本当にログアウトしますか？')) {
        this.$auth.logout()
      }
    },
    searchItem() {
      if(this.searchWord === ""){
        alert("空欄の場合は検索できません")
      }else{
        this['item/searchItem'](this.searchWord)
        this.searchWord = ""
      }
      // const apiKey = '1083744313894679387'
      // if (this.searchWord !== '') {
      //   this.searchedItems = ''
      //   axios
      //     .get(
      //       'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706',
      //       {
      //         params: {
      //           applicationId: apiKey,
      //           keyword: this.searchWord,
      //           hits: 30,
      //         },
      //       }
      //     )
      //     .then((response) => {
      //       console.log(response.data)
      //       this.searchedItems = response.data

      //       this['item/searchItem'](response.data.Items)
      //       this.$store.commit('item/flgChange')
      //       this.$router.push('/')
      //     })

      //     .catch((err) => {
      //       console.log(err)
      //     })
      // }
      // eslint-disable-next-line no-unused-expressions
      // this['item/searchItem'](this.searchWord)
    },
    ...mapActions(['item/searchItem']),
  },
}
</script>

<style scoped>
.form1-input {
  box-sizing: border-box;
  height: 30px;
  width:250px;
  color: #333;
  margin-left:20px;
  border: solid 1px #ccc;
  border-radius: 6px;
  outline: 0;
  -webkit-appearance: none;
}

.form1-input:focus {
  border: 1px solid #00b5ad;
}
.button-18 {
  position: relative;
  display: inline-block;
  padding: 0.4em 1.6em;
  font-size: 0.8em;
  color: #fff;
  text-decoration: none;
  user-select: none;
}
.user_name{
  color:#fff;
}

.link_item {
  color: white;
  text-align: center;
  border-radius: 10px;
  margin-right: 10px;
  text-decoration: none;
}
.icon_text{
  font-size: 12px;
}

.button-18::after {
  position: absolute;
  bottom: 10%;
  left: 50%;
  width: 40%;
  height: 1px;
  margin-top: 4px;
  content: '';
  background: #EEEEEE;
  transition: 0.4s ease;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}
.header_title{
  text-decoration: none;
}
.brand {
  font-weight: bold;
  font-size: 27px; 
  color:#fff
}
.site-header__top {
  background-color: #bf0000; 
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
  background-color:#bf0000; 
}
.cart{
  color:#fff;
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
      padding-bottom: 0.5rem; } }
.site-header__end {
  display: flex;
  align-items: center; }

.site-header__end.top {
  margin-left: 1.5rem; 
}

@media (min-width: 940px) {
  .site-header__end.bottom > *:not(:last-child) {
    margin-right: 1.5rem; } }

@media (max-width: 939px) {
  .site-header__end.bottom .cart {
    margin-right: 1.5rem; } 
  }

/* @media (max-width: 939px) {
  .site-header__end.bottom .search {
    margin-left: 0; } } */

/* .site-header__end.bottom svg {
  width: 22px;
  height: 22px; } */

@media (min-width: 940px) {
  .nav__wrapper {
    display: flex; } }

@media (max-width: 939px) {
  .nav__wrapper {
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    z-index: -1;
    background-color: #d9f0f7;
    float: center;
    visibility: hidden;
    opacity: 0;
    transform: translateY(-100%);
    transition: transform 0.3s ease-out, opacity 0.3s ease-out; }
    .nav__wrapper.active {
      visibility: visible;
      opacity: 1;
      transform: translateY(0); } }

.nav__item:not(:last-child) {
  margin-right: 1.5rem; }

.nav__item a {
  display: block;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem; }
  @media (max-width: 939px) {
    .nav__item a {
      padding: 1rem; } }
/* .nav__item svg {
  display: inline-block;
  vertical-align: middle;
  width: 28px;
  height: 28px;
  margin-right: 1rem; } */
  /* @media (min-width: 940px) {
    .nav__item svg {
      display: block;
      margin: 0 auto 0.5rem; } } */
.nav__item.active a {
  border-left-color: #222; }
  @media (min-width: 800px) {
    .nav__item.active a {
      border-bottom-color: #222; } }
.nav__toggle {
  position: absolute;
  right: 1rem;
  top: 1rem; }
.search {
  display: flex; }

.search__toggle {
  appearance: none;
  order: 1;
  font-size: 0;
  width: 34px;
  height: 34px;
  /* background: url("../img/header-3/search.svg") center/22px no-repeat; */
  border: 0; }
  @media (max-width: 939px) {
    .search__toggle {
      position: absolute;
      right: 5.5rem;
      top: 0.65rem; } }
  /* .search__toggle.active { */
    /* background: url("../img/header-5/close.svg") center/22px no-repeat; } */

.search__form {
  display: none; }
  .search__form.active {
    display: block; }
  @media (max-width: 799px) {
    .search__form {
      position: absolute;
      left: 0;
      right: 0;
      top: 100%;
      background-color: red; }
      .search__form input {
        width: 100%; } }
  .search__form input {
    min-width: 200px;
    appearance: none;
    border: 0;
    background-color: #fff;
    border-radius: 0;
    font-size: 16px;
    padding: 0.5rem; }
    @media (max-width: 799px) {
      .search__form input {
        border-bottom: 1px solid #979797; } }
</style>
