import { shallowMount,createLocalVue,RouterLinkStub } from '@vue/test-utils'
import Vuex from 'vuex'
import History from "../pages/orders/history.vue"
const localVue = createLocalVue()
localVue.use(Vuex)

describe('注文履歴画面に商品が入っている場合のテスト', () => {
  let store
  let wrapper 
  let stubs
  beforeEach(() => {
    // eslint-disable-next-line import/no-named-as-default-member
    store = new Vuex.Store({
      state:{
        auth: {loggedIn: true}
      },
    // 商品が入っている場合の"order/getters"のモック
    getters: {
      "order/historyData": () => [
          {
            orderId: 
            "1632470663818",
            status:2,
            addCartDate:"Fri Sep 24 2021 17:04:23 GMT+0900 (日本標準時)",
            itemInfo:[
              {
                itemId: "elfina1:10000277",
                itemName:"【スーパーセール】【Bluetooth5.0技術 aptX&#8482;】Bluetooth イヤホン Hi-Fi 完全 ワイヤレス イヤホン 自動ペアリング イヤホン本体 音楽再生 充電ケース付き LEDディスプレイ電量表示 ブルートゥース イヤホン 左右分離型 IPX6防水 CVC8.0ノイズキャンセリング AAC対応",
                itemPrice:6580,
                itemImage:"https://thumbnail.image.rakuten.co.jp/@0_gold/elfina1/product/image/ep2/a.jpg?_ex=128x128",
                buyNum:1,
              }
            ],
            orderInfo:{
              destinationAddress: "東京都新宿区歌舞伎町1-1-1",
              destinationDate: "2021-10-08:12:00-17:00",
              destinationEmail: "test@test.com",
              destinationName: "test",
              destinationTel: "09012345678",
              destinationZipcode: "1001014",
            }
          }
        ]
      },
      modules: {
        order: {
          actions:{
            cancelOrder: jest.fn()
          }
        }
      },
      actions: {
        "order/cancelOrder": jest.fn()
      }
    })
    stubs = {
      RouterLink: RouterLinkStub
    }
  })

  test('注文履歴画面のVueインスタンスが存在するのか確認', () => {
    wrapper =shallowMount(History,{
      store,
      stubs,
      localVue
    })
    expect(wrapper.vm).toBeTruthy()
    console.log(wrapper.html())
  })
  test('注文キャンセルボタンのイベント発火を確認', async () => {
    wrapper =shallowMount(History,{
      store,
      stubs,
      localVue
    })
    await wrapper.find('button').trigger('click');
    // await store.dispatch("cancelOrder")
    // expect(store._actions.cancelOrder).toHaveBeenCalled()
  })
  test('nuxt-fontawesomeの確認', () => {
    wrapper =shallowMount(History,{
      store,
      stubs,
      localVue
    })
    expect(wrapper.vm.faShoppingCart).toMatchObject({
      prefix: 'fas',
      iconName: 'shopping-cart',
      icon: [
        576,
        512,
        [],
        'f07a',
        'M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z'
      ]
    })
  })
})
describe('注文履歴画面に商品が入っていない場合のテスト', () => {
  let store
  let wrapper 
  let stubs
  beforeEach(() => {
    // eslint-disable-next-line import/no-named-as-default-member
    store = new Vuex.Store({
      state:{
        auth: {loggedIn: true}
      },
    // 注文履歴がない場合の"order/getters"のモック
    getters: {
      "order/historyData": () => []
      } 
    })
    stubs = {
      RouterLink: RouterLinkStub
    }
  })

  test('注文履歴画面のVueインスタンスが存在するのか確認', () => {
    wrapper =shallowMount(History,{
      store,
      stubs,
      localVue
    })
    expect(wrapper.vm).toBeTruthy()
    console.log(wrapper.html())
  })
  test('「買い物を続ける」ボタンのメソッド発火の確認', () => {
    const mockRouterPush = jest.fn();
    wrapper =shallowMount(History,{
      store,
      localVue,
      mocks:{
        $router: {
          push: mockRouterPush
        },
      },
      stubs
    })
    wrapper.find('.button05').trigger('click');
    expect(mockRouterPush).toHaveBeenCalledWith("/");
  })
})

