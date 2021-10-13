<template>
    <header class="site-header">
      <div class="site-header__top">
        <div class="wrapper site-header__wrapper">
          <div class="site-header__middle">
            <router-link to="/" class="header-title">
             <div class="header-title">RAKURAKU EC</div>
            </router-link>
          </div>
          <div v-if="!loginStatus" class="site-header__end top">
            <router-link to="/user/login">
              <div class="login-button">ログイン</div>
            </router-link>
          </div>
          <div v-else class="site-header__end top">
            <div class="user_name">{{loginUserName}}</div>
            <div class="login-button" @click="logout">ログアウト</div>
          </div>
        </div>
      </div>

      <div class="site-header__bottom">
        <div class="wrapper site-header__wrapper">
          <div class="site-header__start">
            <nav class="nav">
              <input 
              v-model="searchWord" 
              class="search-input" 
              placeholder="商品を検索"/>
              <fa  class="search-button" :icon="faSearch" @click="searchItem"/>
            </nav>
          </div>

          <div class="site-header__end bottom">
              <router-link to="/" class="link_item">
                <fa class="faicon" :icon="faUser"/>
                <div class="icon_text">ユーザー</div>
             </router-link>
              <router-link to="/orders/cart" class="link_item">
                <fa class="faicon" :icon="faShoppingCart"/>
                <div class="icon_text">カート</div>
             </router-link>
              <router-link to="/user/favorite" class="link_item">
                <fa class="faicon" :icon="faStar"/>
                <div class="icon_text">お気に入り</div>
             </router-link>
              <router-link to="/orders/history" class="link_item">
                <fa class="faicon" :icon="faStickyNote"/>
                <div class="icon_text">注文履歴</div>
             </router-link>
          </div>
          
        </div>
      </div>
    </header>
</template>

<script>
import { mapActions } from 'vuex'

import {
  faSearch,
  faStar,
  faShoppingCart,
  faStickyNote,
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
    faUser() {
      return faUser
    },
  },

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
    },
    ...mapActions(['item/searchItem']),
  },
}
</script>

<style scoped>
.header-title{
  font-weight: bold;
  font-size: 27px; 
  color:#fff;
  text-decoration: none;
}
.login-button {
  position: relative;
  display: inline-block;
  padding: 0.4em 1.6em;
  font-size: 0.8em;
  color: #fff;
  text-decoration: none;
  user-select: none;
}
.login-button::after {
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
.user_name{
  color:#fff;
}
.search-input {
  box-sizing: border-box;
  height: 30px;
  width:250px;
  color: #333;
  margin-left:15px;
  border: solid 1px #ccc;
  border-radius: 6px;
  outline: 0;
  -webkit-appearance: none;
}
.search-button{
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
@media (max-width: 650px) {
  .search-input {
  margin-left:0px;
  height: 25px;
  width:150px;
  }
  .faicon {
    font-size: 12px;
  }
  .icon_text{
    font-size: 6px;
  }
}
@media (max-width: 430px) {
  .search-input {
    margin-left:0px;
    height: 25px;
    width:120px;
  }
  .link_item {
    margin-right: 3px;
  }
  .faicon {
    font-size: 8px;
  }
  .icon_text{
    font-size: 4px;
  } 
}
@media (max-width: 430px) {
  .header-title {
  font-size: 18px; 
  }
}
.site-header__top {
  background-color: #bf0000; 
}
.site-header__bottom {
  background-color:#bf0000; 
}
.site-header__wrapper {
  display: flex;
  justify-content: space-between; 
}
.site-header__wrapper {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem; 
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
</style>
