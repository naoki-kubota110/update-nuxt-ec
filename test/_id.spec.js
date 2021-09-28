import { config, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import _id from '../pages/item/_id.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
const router = new VueRouter()

config.stubs.fa = { template: '<div></div> ' }

describe('商品詳細ページのテスト', () => {
  let store
  let wrapper

  beforeEach(() => {
    // eslint-disable-next-line import/no-named-as-default-member
    store = new Vuex.Store({
      state: {
        auth: { loggedIn: true },
      },
    })
    wrapper = shallowMount(_id, {
      store,
      router,
      localVue,
    })
  })

  test('Vueインスタンスが存在するのか確認', () => {
    expect(wrapper.vm).toBeTruthy()
  })
  test('タイトルのタグ確認', () => {
    expect(wrapper.text()).toContain('商品詳細')
  })
  // ========メソッド=========
  test('タイトルのタグ確認', () => {
    expect(wrapper.text()).toContain('商品詳細')
  })
  test('タイトルのタグ確認', () => {
    expect(wrapper.text()).toContain('商品詳細')
  })
  // =========================
  // test('click button sendOrder', async () => {
  //   await wrapper.vm.addCart()
  //   // expect(wrapper.text()).toContain('Count is: 1')

  // })
  // test('click button sendOrder', async () => {
  //   await wrapper.vm.addFavorite()
  //   // expect(wrapper.text()).toContain('Count is: 1')
  // })
})
