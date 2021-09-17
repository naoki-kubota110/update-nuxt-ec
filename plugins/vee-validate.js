import Vue from 'vue'
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize,
} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import ja from 'vee-validate/dist/locale/ja.json'

// ルールの追加
extend('date', {
  // エラーメッセージを設定する
  message: '明日以降の日付を選択してください',
  validate(value) {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()
    const day = today.getDate()

    const nowDay = new Date(year, month, day)
    const selectDay = new Date(value)
    const termDay = (selectDay - nowDay) / 86400000

    if (termDay > 1) {
      return true
    }
  },
})

// import all rules
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]) // eslint-disable-line
})

localize('ja', ja)

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
