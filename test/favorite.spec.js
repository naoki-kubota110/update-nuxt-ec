import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Vuex from 'vuex'
import favorite from '../pages/user/favorite'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('favoriteコンポーネントのテスト', () => {
  let store
  let wrapper
  let stubs
  beforeEach(() => {
    // Vuexストアのモックを作成する
    // const actions = {
    //   'users/getFavoriteItem': jest.fn(),
    //   'users/deleteFavoriteItem': jest.fn(),
    // }

    // eslint-disable-next-line import/no-named-as-default-member
    store = new Vuex.Store({
      // actions,
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
      actions: {
        'users/getFavoriteItem': jest.fn(),
        'users/deleteFavoriteItem': jest.fn(),
      },
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
    console.log(store._actions.users)
  })
  // test('お気に入り解除ボタンを押してdeleteFavoriteItemメソッドの発火確認', () => {
  //   wrapper.find('.delete-btn').trigger('click')
  //   // store.users.dispatch('deleteFavoriteItem')
  //   // expect(store.actions.deleteFavoriteItem).toHaveBeenCalled()
  //   expect(wrapper.vm.deleteFavoriteItem).toHaveBeenCalled()
  //   // expect(
  //   //   store._actions['users/deleteFavoriteItem']
  //   //   // 'uminekotayori:10002981',
  //   //   // 'abcdefg'
  //   // ).toHaveBeenCalled()
  // })
  // test('発火確認', () => {
  //   wrapper.vm.deleteFavoriteItem()
  //   expect(store.actions['users/deleteFavoriteItem']).toHaveBeenCalled()
  // })
})
