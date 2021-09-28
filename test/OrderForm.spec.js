import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import OrderForm from '../components/OrderForm'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('トップページのテスト', () => {
  let store
  let wrapper
  const orderDetailsMock = {
    userId: 'abcdefghij',
    // orderId: this.orderId,
    // status: Number(this.paymentMethod),
    // // 注文入力フォームのデータ
    // destinationName: this.destinationName,
    // destinationEmail: this.destinationEmail,
    // destinationZipcode: this.destinationZipcode,
    // destinationAddress: this.destinationAddress,
    // destinationTel: this.destinationTel,
    // destinationDate: this.destinationDate + ':' + this.destinationTime,
    // paymentMethod: this.paymentMethod,
    // creditCardNumber: this.creditCardNumber,
    // // 注文ボタンを押したときの日時
    // orderDate: new Date().toString(),
  }

  beforeEach(() => {
    // eslint-disable-next-line import/no-named-as-default-member
    store = new Vuex.Store({})

    wrapper = shallowMount(OrderForm, {
      store,
      localVue,
      orderDetailsMock,
    })
  })

  test('Vueインスタンスが存在するのか確認', () => {
    expect(wrapper.vm).toBeTruthy()
  })
  // test('click button sendOrder', async () => {
  //   await wrapper.get('button').trigger('click')
  //   expect(wrapper.text()).toContain('Count is: 1')
  // })
  // const input = wrapper.get('input')
  // input.setValue('山田太郎')
  // test('click button sendOrder', () => {
  //   wrapper.vm.sendOrder()
  //   // console.log(wrapper.emitted())
  // })
  // const input = wrapper.get('#form-item-name')
  // input.setValue('山田太郎')
  // test('click button sendOrder', () => {
  //   wrapper.vm.sendOrder()
  //   // console.log(wrapper.emitted())
  // })
})
