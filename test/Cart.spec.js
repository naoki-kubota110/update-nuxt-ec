import {
  config,
  shallowMount,
  createLocalVue,
  RouterLinkStub,
} from '@vue/test-utils'
import Vuex from 'vuex'
import Cart from '../pages/orders/cart.vue'
const localVue = createLocalVue()
localVue.use(Vuex)

config.stubs.fa = { template: '<div></div> ' }

describe('ショッピングカート画面に商品が入っている場合のテスト', () => {
  let store
  let wrapper
  let stubs
  beforeEach(() => {
    // eslint-disable-next-line import/no-named-as-default-member
    store = new Vuex.Store({
      state: {
        auth: { loggedIn: true },
      },
      // 商品が入っている場合の"order/getters"のモック
      getters: {
        'order/CartDataArry': () => [
          {
            orderId: '1632470663818',
            status: 0,
            addCartDate: 'Fri Sep 24 2021 17:04:23 GMT+0900 (日本標準時)',
            itemInfo: [
              {
                itemId: "elfina1:10000277",
                itemName:"【スーパーセール】【Bluetooth5.0技術 aptX&#8482;】Bluetooth イヤホン Hi-Fi 完全 ワイヤレス イヤホン 自動ペアリング イヤホン本体 音楽再生 充電ケース付き LEDディスプレイ電量表示 ブルートゥース イヤホン 左右分離型 IPX6防水 CVC8.0ノイズキャンセリング AAC対応",
                itemPrice:6580,
                itemImage:"https://thumbnail.image.rakuten.co.jp/@0_gold/elfina1/product/image/ep2/a.jpg?_ex=128x128",
                buyNum:1,
              }
            ]
          }
        ]
      }

    })
    stubs = {
      RouterLink: RouterLinkStub,
    }
  })

  test('ショッピングカート画面のVueインスタンスが存在するのか確認', () => {
    wrapper = shallowMount(Cart, {
      store,
      stubs,
      localVue,
    })
    expect(wrapper.vm).toBeTruthy()
    // console.log(wrapper.html())
  })
  test('カートデータがからの場合、合計金額が0円になることを確認', () => {
    // eslint-disable-next-line import/no-named-as-default-member
    store = new Vuex.Store({
      state: {
        auth: { loggedIn: true },
      },
      getters: {
        'order/CartDataArry': () => [],
      },
    })
    wrapper = shallowMount(Cart, {
      store,
      stubs,
      localVue,
    })
    // console.log(wrapper.html())
    expect(wrapper.vm.CartSumPrice).toBe(0)
  })
  test('router-linkがあるコンポーネント', () => {
    wrapper = shallowMount(Cart, {
      store,
      stubs,
      localVue,
    })
    expect(wrapper.vm).toBeTruthy()
  })
  test('カート商品削除ボタンのイベント発火を確認', () => {
    wrapper = shallowMount(Cart, {
      store,
      stubs,
      localVue,
    })
    wrapper.find('.remove-product').trigger('click')
  })
  test('nuxt-fontawesomeの確認', () => {
    wrapper = shallowMount(Cart, {
      store,
      stubs,
      localVue,
    })
    expect(wrapper.vm.faLock).toMatchObject({
      prefix: 'fas',
      iconName: 'lock',
      icon: [
        448,
        512,
        [],
        'f023',
        'M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z',
      ],
    })
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
  })
})

describe('ショッピングカート画面の商品が空の場合のテスト', () => {
  let store
  let wrapper
  let stubs
  beforeEach(() => {
    // eslint-disable-next-line import/no-named-as-default-member
    store = new Vuex.Store({
      // 商品が入っていない場合の"order/getters"のモック
      getters: {
        'order/CartDataArry': () => [],
      },
    })
    stubs = {
      RouterLink: RouterLinkStub,
    }
  })

  test('カートデータが空の場合、合計金額が0円になることを確認', () => {
    wrapper = shallowMount(Cart, {
      store,
      localVue,
      stubs,
    })
    // console.log(wrapper.html())
    expect(wrapper.vm.CartSumPrice).toBe(0)
  })
  test('「買い物を続ける」ボタンのメソッド発火の確認', () => {
    const mockRouterPush = jest.fn()
    wrapper = shallowMount(Cart, {
      store,
      localVue,
      mocks: {
        $router: {
          push: mockRouterPush,
        },
      },
      stubs,
    })
    wrapper.find('.button05').trigger('click')
    expect(mockRouterPush).toHaveBeenCalledWith('/')
  })
})
