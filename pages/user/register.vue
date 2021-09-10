<template>
  <div>
    <h1>ユーザ登録</h1>
    <ValidationObserver ref="observer" v-slot="{ invalid }">
      <form @submit.prevent="registerUser">
        <div class="name-form">
          <label for="name">Name:</label>
          <ValidationProvider
            v-slot="{ errors }"
            name="お名前"
            rules="required|min:1|max:10"
          >
            <input v-model="user.name" type="text" />
            <p class="text-danger">{{ errors[0] }}</p>
          </ValidationProvider>
        </div>
        <div class="email-form">
          <label for="email">Email:</label>
          <ValidationProvider
            v-slot="{ errors }"
            name="メールアドレス"
            rules="required|email|"
          >
            <input v-model="user.email" type="email" />
            <p class="text-danger">{{ errors[0] }}</p>
          </ValidationProvider>
        </div>
        <div class="password-form">
          <label for="password">Password:</label>
          <ValidationProvider
            v-slot="{ errors }"
            name="パスワード"
            rules="required|min:6|max:12"
          >
            <input v-model="user.password" type="password" />
            <p class="text-danger">{{ errors[0] }}</p>
          </ValidationProvider>
        </div>
        <button type="submit" :disabled="invalid">登録</button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  middleware({ store, redirect }) {
    if (store.$auth.loggedIn) {
      redirect('/')
    }
  },
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
      },
    }
  },
  methods: {
    registerUser() {
      console.log(this.user)
      this.$axios.post('/api/user/register', this.user).then((response) => {
        console.log(response)
        this.$auth.loginWith('local', {
          data: this.user,
        })
      })
    },
  },
}
</script>
