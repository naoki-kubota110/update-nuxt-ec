<template>
<footer>
    <div class="foot-wrap">
        <div class="foot-menu">
           <router-link to="/">
             <h3>ホーム</h3>
           </router-link>
        </div>
        <div class="foot-menu">
            <h3>ユーザー情報</h3>
        </div>
        <div class="foot-menu">
            <h3>カート</h3>
        </div>
        <div class="foot-menu">
            <h3>お気に入り</h3>
        </div>
        <div class="foot-menu">
            <h3>注文履歴</h3>
        </div>
        <small class="cmark">©️copyright 2020
            <a href="#">rakurakuEC</a>
        </small>
    </div>
</footer>
</template>

<style scoped>
.foot-wrap {
    background-color: #bf0000;
    color: #fff;
    text-align: center;
}

.foot-wrap .foot-menu{
    display: inline-block;
    width: 15%;
    margin: 0 auto;
}

.foot-wrap h3 {
    padding: 10px;
    font-weight: 100;
    font-size: 12px;
}

.foot-wrap a {
  text-decoration: none;
  color: #fff;
}

.foot-wrap .cmark {
  display: block;
  padding: 10px;
  border-top: 1px solid gray;
  width: 80%;
  margin: 0 auto;
  color: gray;
}

@media screen and (max-width: 650px) {
  .foot-wrap .foot-menu{
    display: flex;
    flex-direction: column;
    width: 30%;
  }
  .foot-wrap .cpr {
    display: inline;
  }
  .foot-wrap h3 {
  font-size: 3px;
  padding: 5px;
  } 
}
@media screen and (max-width: 430px) {
  .foot-wrap h3 {
    font-size: 3px;
    padding: 2px;
  }
}
</style>