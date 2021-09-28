import { config, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import OrderForm from '../components/OrderForm'

const localVue = createLocalVue()
localVue.use(Vuex)
config.stubs.ValidationObserver = { template: '<div></div> ' }

describe('オーダーフォームコンポーネントのテスト', () => {
  let store
  let wrapper
  const methodsMock = { sendOrder: jest.fn() }

  beforeEach(() => {
    // eslint-disable-next-line import/no-named-as-default-member
    store = new Vuex.Store({})

    wrapper = shallowMount(OrderForm, {
      methodsMock,
      store,
      localVue,
      propsData: {
        orderId: 'abcdefg',
      },
    })
  })

  test('Vueインスタンスが存在するのか確認', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  // test('computed property nowDay', () => {
  //   wrapper.vm.nowDay()
  // })
  // it('pickupItemが期待通りか？', () => {
  //   const day = '2021年10月1日'

  //   const wrapper = shallowMount(OrderForm, {
  //     propsData: { day },
  //   })
  //   expect(wrapper.vm.nowDay).toEqual('2021年10月1日')
  // })

  test('method sendOrder', () => {
    wrapper.vm.sendOrder()
  })
  test('propsを受け取れること', () => {
    expect(wrapper.vm.$props.orderId).toBe('abcdefg')
  })

  // it('should call my function', () => {
  //   // use mockImplementation if you want to return a value
  //   window.confirm = jest.fn().sendOrder(() => true)

  //   // fireEvent.click(getByText("Supprimer"))

  //   expect(window.confirm).toHaveBeenCalled()
  // })
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
