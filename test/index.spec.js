import { config, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import index from '../pages/index.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
config.stubs.swiper = { template: '<div></div> ' }

describe('トップページのテスト', () => {
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

    wrapper = shallowMount(index, {
      store,
      localVue,
    })
  })

  test('Vueインスタンスが存在するのか確認', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('v-showが存在するか', () => {
    const itemflg = wrapper.get('#itemflg')
    expect(itemflg.exists()).toBe(true)
  })
  test('v-showがfalseか', () => {
    const itemflg = wrapper.get('#itemflg')
    expect(itemflg.isVisible()).toBe(false)
    // console.log(wrapper.html())
  })
})
