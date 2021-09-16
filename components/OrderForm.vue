<template>
  <div>
    {{ destinationDate }}
    <h1>注文フォーム</h1>
    <ValidationObserver ref="orderform" v-slot="{ invalid }">
      <form @submit.prevent="sendOrder">
        <div>
          <label>お名前：</label>
          <ValidationProvider
            v-slot="{ errors }"
            name="名前"
            rules="required|max:50"
          >
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
            rules="required|numeric|min:10|max:11"
          >
            <input
              v-model="destinationTel"
              placeholder="0000000000"
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
            rules="required|email|"
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
            rules="required|digits:7"
            :validate="{
              required: true,
              regex: /^[0-9]+$/,
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
          <ValidationProvider v-slot="{ errors }" rules="required|date">
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
            rules="required|date"
          >
            <input v-model="destinationDate" name="配達日" type="date" />
            <span>{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <ValidationProvider
          v-if="destinationDate !== ''"
          v-slot="{ errors }"
          rules="required"
        >
          <div>
            <span>配達時間：</span>
            <select v-model="destinationTime" name="配達時間">
              <option value="8:00-21:00">指定なし</option>
              <option value="8:00-12:00">午前（8:00-12:00）</option>
              <option value="12:00-17:00">午後（12:00-17:00）</option>
              <option value="17:00-21:00">夜間（17:00-21:00）</option>
            </select>
            <span>{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

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
            :rules="{
              required: true,
              regex: /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/,
            }"
          >
            <div>
              <span>クレジット番号：</span
              ><input
                v-model="creditCardNumber"
                placeholder="1111-1111-1111-1111"
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
      selectedDestinationDate: false,
      destinationTime: '',
    }
  },
  computed: {
    nowDay() {
      const today = new Date()
      const year = today.getFullYear()
      const month = today.getMonth() + 1
      const day = today.getDate()

      return String(year + '-' + month + '-' + day)
    },
  },
  methods: {
    sendOrder() {
      if (confirm('注文を確定しますか?')) {
        const orderDetails = {
          userId: this.$auth.user.id,
          orderId: this.orderId,
          status: Number(this.paymentMethod),
          // 注文入力フォームのデータ
          destinationName: this.destinationName,
          destinationEmail: this.destinationEmail,
          destinationZipcode: this.destinationZipcode,
          destinationAddress: this.destinationAddress,
          destinationTel: this.destinationTel,
          destinationDate: this.destinationDate + ':' + this.destinationTime,
          paymentMethod: this.paymentMethod,
          creditCardNumber: this.creditCardNumber,
          // 注文ボタンを押したときの日時
          orderDate: new Date().toString(),
<<<<<<< HEAD
          // userInfo: {
          //   name: this.destinationName,
          //   email: this.destinationEmail,
          //   zipcode: this.destinationZipcode,
          //   address: this.destinationAddress,
          //   tel: this.destinationTel,
          // },
=======
>>>>>>> 081e219d2da3693e423c95248a53da4bb938ab5d
        }
        console.log(orderDetails)
        this['shoppingCart/sendOrder'](orderDetails)
      }
    },
    ...mapActions(['shoppingCart/sendOrder']),
  },
}
</script>

//
<style lang="scss" scoped>
// input {
//   width: 300px;
//   height: 30px;
// }
//
</style>
