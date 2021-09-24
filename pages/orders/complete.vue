<template>
<div class="container">
  <div>
  <h1>決済が完了しました！</h1>
  <div>
    <p>この度はご注文ありがとうございます。</p>
    <p>お支払い先は、お送りしたメールに記載してありますのでご確認ください。</p>
    <p>メールが届かない場合は「注文履歴」からご確認ください。</p>
  </div>
  </div>
  <div class="button05" @click.prevent="backHome">
    <a href="">お買い物を続ける</a>
  </div>
	</div>
</template>

<script>
export default {
  middleware({ store, redirect }){
    if(!store.$auth.loggedIn){
      redirect('/user/login');
    }
  },
  methods:{
    backHome(){
      this.$router.push("/")
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 100px;
 text-align: center;
}
</style>