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
  const MockItemData = [
    {
      itemId: 'gaisense:10000039',
      itemName:
        '＼クーポンセール開催中／わた増量 ペットベッド 猫 ペットベッド 犬 ペット ベッド ベッド ふわふわ 小型犬 中型犬 猫用 猫 ベッド 暖...',
      itemPrice: 2580,
      itemImage:
        'https://thumbnail.image.rakuten.co.jp/@0_mall/gaisense/cabinet/0768960...',
    },
  ]

  beforeEach(() => {
    const actions = {
      'users/addFavoriteItem': jest.fn(),
    }
    // eslint-disable-next-line import/no-named-as-default-member
    store = new Vuex.Store({
      actions,
      state: {
        auth: {
          loggedIn: true,
          user: {
            id: 'abcdefg',
          },
        },
      },
    })
    wrapper = shallowMount(_id, {
      store,
      router,
      localVue,
      MockItemData,
    })
  })

  test('Vueインスタンスが存在するのか確認', () => {
    expect(wrapper.vm).toBeTruthy()
  })
  test('タイトルのタグ確認', () => {
    expect(wrapper.text()).toContain('商品詳細')
  })

  test('faアイコンの確認', () => {
    expect(wrapper.vm.faShoppingCart).toMatchObject({
      prefix: 'fas',
      iconName: 'shopping-cart',
      icon: [
        576,
        512,
        [],
        'f07a',
        'M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z',
      ],
    })
    expect(wrapper.vm.faStar).toMatchObject({
      prefix: 'fas',
      iconName: 'star',
      icon: [
        576,
        512,
        [],
        'f005',
        'M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z',
      ],
    })
  })
  test('addCartメソッド確認', () => {
    expect(wrapper.vm.addCart()).toContain('商品詳細')
  })
  test('addFavoriteメソッド確認', () => {
    expect(wrapper.vm.addFavorite()).toContain('商品詳細')
  })
})
