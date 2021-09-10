<template>
<div>
  <h1>ログイン画面</h1>
  <ValidationObserver ref="observer" v-slot="{ invalid }">
    <form @submit.prevent="loginUser">
      <div class="email-form">
        <label for="email">Email:</label>
        <ValidationProvider v-slot="{ errors }" name="メールアドレス" rules="required|email|">
          <input v-model="user.email" type="email">
          <p class="text-danger">{{ errors[0] }}</p>
        </ValidationProvider>
      </div>
      <div class="password-form">
        <label for="password">Password:</label>
        <ValidationProvider v-slot="{ errors }" name="パスワード" rules="required">
        <input v-model="user.password" type="password">
        <p class="text-danger">{{ errors[0] }}</p>
        </ValidationProvider>
      </div>
      <button type="submit" :disabled="invalid">ログイン</button>
      <p>{{errorMsg}}</p>
    </form>
   </ValidationObserver>
</div>
</template>

<script>
  export default {
    middleware({ store, redirect }){
      if(store.$auth.loggedIn){
        redirect('/');
      }
    },
    data(){
      return {
        user:{
          email:'',
          password:''
        },
        errorMsg:""
      }
    },
    methods:{
      loginUser(){
        this.$auth.loginWith('local',{data:this.user})
        .then(res => {
          console.log("成功")
          console.log(res)
        })
        .catch((err) => {
          console.log(err.response)
          this.errorMsg = "メールアドレスまたはパスワードが間違っています。"
        })
      },
    }
  }
</script>

<style lang="sass">
</style>