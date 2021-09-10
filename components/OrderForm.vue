<template>
  <div>
    <h1>注文フォーム</h1>
    <ValidationObserver ref="myform">
      <validation-provider v-slot="{ errors }" rules="name|required">
        <div>
          <label>お名前：</label>
          <input
            v-model="name"
            name="名前"
            placeholder="山田太郎"
            type="text"
          />
          <span>{{ errors[0] }}</span>
        </div>
      </validation-provider>

      <validation-provider v-slot="{ errors }" rules="email|required">
        <div>
          <label>メールアドレス：</label>
          <input
            v-model="email"
            name="メールアドレス"
            placeholder="sample@gmail.com"
            type="text"
          />
          <span>{{ errors[0] }}</span>
        </div>
      </validation-provider>

      <validation-provider v-slot="{ errors }" rules="zipCode|required">
        <div>
          <label>郵便番号：</label>
          <input
            v-model="zipCode"
            name="郵便番号"
            placeholder="0000000"
            type="text"
          />
          <span>{{ errors[0] }}</span>
        </div>
      </validation-provider>

      <validation-provider v-slot="{ errors }" rules="address|required">
        <div>
          <label>住所：</label>
          <input
            v-model="address"
            name="住所"
            placeholder="東京都×××区××1丁目"
            type="text"
          />
          <span>{{ errors[0] }}</span>
        </div>
      </validation-provider>

      <validation-provider v-slot="{ errors }" rules="date|required">
        <div>
          <label>配達日：</label>
          <input v-model="date" name="配達日" type="date" />
          <span>{{ errors[0] }}</span>
        </div>
      </validation-provider>

      <validation-provider v-slot="{ errors }" rules="date|required">
        <div>
          <label>支払い方法：</label>
          <input
            v-model="payment"
            name="支払い方法"
            type="radio"
            value="クレジット"
            checked
          /><span>クレジット</span>
          <input
            v-model="payment"
            name="支払い方法"
            type="radio"
            value="代金引換"
          /><span>代金引換</span>
          <span>{{ errors[0] }}</span>
        </div>
      </validation-provider>
    </ValidationObserver>
    <button type="submit">注文</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      zipCode: '',
      address: '',
      date: '',
      payment: '',
      creditNumber: '',
    }
  },
}
</script>
