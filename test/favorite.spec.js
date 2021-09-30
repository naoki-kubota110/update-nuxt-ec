import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Vuex from 'vuex'
import favorite from '../pages/user/favorite'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('favoriteコンポーネントのテスト', () => {
  let store
  let actions
  let wrapper
  let stubs
  beforeEach(() => {
    // Vuexストアのモックを作成する

    actions = {
      'users/getFavoriteItem': jest.fn(),
      'users/deleteFavoriteItem': jest.fn(),
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
        users: {
          favoriteItem: {
            favoriteId: 'uminekotayori:10002981',
            itemName:
              '南部煎餅10個セット（胡麻、豆、ミックス、白、並胡麻各2個）■10P03Dec16■【TH】新型コロナに負けるな おせんべいのスーパーセール',
            itemImage:
              'https://thumbnail.image.rakuten.co.jp/@0_mall/uminekotayori/cabinet/ka...',
            itemPrice: 3000,
          },
        },
      },
      // actions: {
      //   'users/getFavoriteItem': jest.fn(),
      //   'users/deleteFavoriteItem': jest.fn(),
      // },
    })
    stubs = {
      RouterLink: RouterLinkStub,
    }

    wrapper = shallowMount(favorite, {
      store,
      localVue,
      stubs,
    })
  })

  test('Vueインスタンスが存在するのか確認', () => {
    expect(wrapper.vm).toBeTruthy()
    // console.log(store._actions)
  })

  test('deleteFavoriteItemメソッドでstoreのactionsが呼び出せているか', () => {
    wrapper.find('.delete-btn').trigger('click')
    wrapper.vm.deleteFavoriteItem()
    expect(actions['users/deleteFavoriteItem']).toHaveBeenCalled()
  })
})
