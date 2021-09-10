<template>
  <div>
    <h1>注文フォーム</h1>
    <ValidationObserver ref="orderform" v-slot="{ invalid }">
      <form @submit.prevent="sendOrder">
        <div>
          <label>お名前：</label>
          <ValidationProvider v-slot="{ errors }" name="名前" rules="required">
            <input
              v-model="destinationName"
              placeholder="山田太郎"
              type="text"
            />
            <span>{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div>
          <label>電話番号：</label>
          <ValidationProvider
            v-slot="{ errors }"
            name="電話番号"
            rules="required"
          >
            <input
              v-model="destinationTel"
              placeholder="00-0000-0000"
              type="text"
            />
            <span>{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div>
          <label>メールアドレス：</label>
          <ValidationProvider
            v-slot="{ errors }"
            name="メールアドレス"
            rules="email|required|"
            :validate="{
              required: true,
              max: 15,
              regex: '^(070|080|090)-\\d{4}-\\d{4}$',
            }"
          >
            <input
              v-model="destinationEmail"
              placeholder="sample@gmail.com"
              type="text"
            />
            <span>{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div>
          <label>郵便番号：</label>
          <ValidationProvider
            v-slot="{ errors }"
            name="郵便番号"
            rules="required"
          >
            <input
              v-model="destinationZipcode"
              placeholder="0000000"
              type="text"
            />
            <span>{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div>
          <label>住所：</label>
          <ValidationProvider v-slot="{ errors }" rules="required">
            <input
              v-model="destinationAddress"
              name="住所"
              placeholder="東京都×××区××1丁目"
              type="text"
            />
            <span>{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div>
          <label>配達日：</label>
          <ValidationProvider
            v-slot="{ errors }"
            name="配達日"
            rules="required"
          >
            <input v-model="destinationDate" name="配達日" type="date" />
            <span>{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div>
          <label>支払い方法：</label>
          <ValidationProvider v-slot="{ errors }" rules="required">
            <input
              name="支払い方法"
              type="radio"
              value="代金引換"
              checked
            /><span>代金引換</span>
            <input name="支払い方法" type="radio" value="クレジット" /><span
              >クレジット</span
            >
            <span>{{ errors[0] }}</span>
            <div><span>クレジット番号：</span><input type="text" /></div>
          </ValidationProvider>
        </div>

        <button type="submit" :disabled="invalid">注文</button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  // asyncData() {
  //   return this.$axios.$get('/api/cart/shoppingcart').then((response) => {
  //     return {
  //       cartData: response.data,
  //     }
  //   })
  // },

  data() {
    return {
      destinationName: '',
      destinationTel: '',
      destinationEmail: '',
      destinationZipcode: '',
      destinationAddress: '',
      destinationDate: '',
      paymentMethod: '',
      creditCardNumber: '',
    }
  },

  methods: {
    sendOrder() {
      if (confirm('注文を確定しますか?')) {
        console.log('バリデーション')
      }
    },
  },
}
</script>
