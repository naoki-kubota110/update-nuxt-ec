<template>
  <div class="form-wrapper">
    <h1>Sign In</h1>
    <ValidationObserver ref="observer" v-slot="{ invalid }">
      <form @submit.prevent="loginUser">
        <div class="form-item">
          <ValidationProvider
            v-slot="{ errors }"
            name="メールアドレス"
            rules="required|email|"
          >
            <label for="email"></label>
            <input
              v-model="user.email"
              type="email"
              class="email"
              name="email"
              required="required"
              placeholder="メールアドレス"
            />
            <p class="text-danger">{{ errors[0] }}</p>
          </ValidationProvider>
        </div>
        <div class="form-item">
          <ValidationProvider
            v-slot="{ errors }"
            name="パスワード"
            rules="required"
          >
            <label for="password"></label>
            <input
              v-model="user.password"
              type="password"
              class="password"
              name="password"
              required="required"
              placeholder="パスワード"
            />
            <p class="text-danger">{{ errors[0] }}</p>
          </ValidationProvider>
        </div>
        <div class="button-panel">
          <input
            type="submit"
            class="button"
            title="ログイン"
            value="Sign In"
            :disabled="invalid"
          />
        </div>
        <p>{{ errorMsg }}</p>
      </form>
    </ValidationObserver>
    <div class="form-footer">
      <p>
        <router-link :to="{ path: '/user/register' }"
          >新規登録はこちら</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  middleware: 'direct-home',
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      errorMsg: '',
    }
  },
  methods: {
    loginUser() {
      this['users/login'](this.user)
    },
    ...mapActions(['users/login']),
  },
}
</script>

<style lang="scss" scoped>
body {
  background: #e9e9e9;
  color: #5e5e5e;
  font: 400 87.5%/1.5em 'Open Sans', sans-serif;
}

.form-wrapper {
  background: #fafafa;
  margin: 3em auto;
  padding: 0 1em;
  max-width: 370px;
}

h1 {
  text-align: center;
  padding: 1em 0;
}

form {
  padding: 0 1.5em;
}

.form-item {
  margin-bottom: 0.75em;
  width: 100%;
}

.form-item input {
  background: #fafafa;
  border: none;
  border-bottom: 2px solid #e9e9e9;
  color: #666;
  font-family: 'Open Sans', sans-serif;
  font-size: 1em;
  height: 50px;
  transition: border-color 0.3s;
  width: 100%;
}

.form-item input:focus {
  border-bottom: 2px solid #c0c0c0;
  outline: none;
}

.button-panel {
  margin: 2em 0 0;
  width: 100%;
}

.button-panel .button {
  background: #f16272;
  border: none;
  color: #fff;
  cursor: pointer;
  height: 50px;
  font-family: 'Open Sans', sans-serif;
  font-size: 1.2em;
  letter-spacing: 0.05em;
  text-align: center;
  text-transform: uppercase;
  transition: background 0.3s ease-in-out;
  width: 100%;
}

.button:hover {
  background: #ee3e52;
}

.form-footer {
  font-size: 1em;
  padding: 1em 0;
  text-align: center;
}

.form-footer a {
  color: #8c8c8c;
  text-decoration: none;
  transition: border-color 0.3s;
}

.form-footer a:hover {
  border-bottom: 1px dotted #8c8c8c;
}
</style>
