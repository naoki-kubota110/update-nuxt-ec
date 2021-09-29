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
    const actions = {
      'order/sendOrder': jest.fn(),
    }
    // eslint-disable-next-line import/no-named-as-default-member
    store = new Vuex.Store({
      actions,
      state: {
        auth: {
          user: {
            id: 'abcdefg',
          },
        },
      },
    })

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

  test('method sendOrder', () => {
    wrapper.vm.sendOrder()
  })
  test('propsを受け取れること', () => {
    expect(wrapper.vm.$props.orderId).toBe('abcdefg')
  })
  test('nowDay()の戻り値が2021-9-29ならOK', () => {
    const mockDate = new Date(2021, 8, 29, 2)
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate)
    expect(wrapper.vm.nowDay).toBe('2021-9-29')
  })
})
