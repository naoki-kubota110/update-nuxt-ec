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
            :validate="{
              required: true,
              regex: '^(070|080|090)-\\d{4}-\\d{4}$',
            }"
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
              v-model="paymentMethod"
              :paymentCredit="false"
              name="支払い方法"
              type="radio"
              value="1"
              checked
              @click="paymentCredit = !paymentCredit"
            /><span>代金引換</span>
            <input
              v-model="paymentMethod"
              name="支払い方法"
              type="radio"
              value="2"
              @click="paymentCredit = 'true'"
            /><span>クレジット</span>
            <span>{{ errors[0] }}</span>
          </ValidationProvider>

          <ValidationProvider
            v-if="paymentCredit"
            v-slot="{ errors }"
            rules="required"
          >
            <div>
              <span>クレジット番号：</span
              ><input
                v-model="creditCardNumber"
                name="クレジット番号"
                type="text"
              />
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
        </div>

        <button type="submit" :disabled="invalid">注文</button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    orderId: {
      type: String,
      default: '',
      required: true,
    },
  },
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
      paymentMethod: '1',
      creditCardNumber: '',

      paymentCredit: false,
    }
  },

  methods: {
    sendOrder() {
      if (confirm('注文を確定しますか?')) {
        const orderDetails = {
          // id: String,
          orderId: this.orderId,
          status: Number(this.paymentMethod),
          // addCartDate: new Date().getTime().toString(),
          // itemInfo: Array,
          // 注文入力フォームのデータ
          destinationName: this.destinationName,
          destinationEmail: this.destinationEmail,
          destinationZipcode: this.destinationZipcode,
          destinationAddress: this.destinationAddress,
          destinationTel: this.destinationTel,
          destinationDate: this.destinationDate,
          paymentMethod: this.paymentMethod,
          creditCardNumber: this.creditCardNumber,
          // 注文ボタンを押したときの日時
          orderDate: new Date().getTime().toString(),

          // userInfo: {
          //   name: this.destinationName,
          //   email: this.destinationEmail,
          //   zipcode: this.destinationZipcode,
          //   address: this.destinationAddress,
          //   tel: this.destinationTel,
          // },
        }
        console.log(orderDetails)
        this['shoppingCart/sendOrder'](orderDetails)
      }
    },
    ...mapActions(['shoppingCart/sendOrder']),
  },
}
</script>
