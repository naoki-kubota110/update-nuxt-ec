import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Header from '../components/Header'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ヘッダーのテスト', () => {
  let store
  let itemStoreMock
  let wrapper

  beforeEach(() => {
    // Vuexストアのモックを作成する
    itemStoreMock = {
      itemflg: true,
      shopItems: [],
    }
    // eslint-disable-next-line import/no-named-as-default-member
    store = new Vuex.Store({
      modules: {
        item: itemStoreMock,
      },
    })

    wrapper = shallowMount(Header, {
      store,
      localVue,
    })
  })

  test('Vueインスタンスが存在するのか確認', () => {
    expect(wrapper.vm).toBeTruthy()
  })
})
