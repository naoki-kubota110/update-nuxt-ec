import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import favorite from '../pages/user/favorite'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('favoriteコンポーネントのテスト', () => {
  let store
  let wrapper

  beforeEach(() => {
    // Vuexストアのモックを作成する
    const actions = {
      'users/getFavoriteItem': jest.fn(),
    }

    // eslint-disable-next-line import/no-named-as-default-member
    store = new Vuex.Store({
      actions,
      state: {
        auth: {
          loggedIn: true,
          user: {
            id: 'abc',
          },
        },
        users: {
          favoriteItem: [],
        },
      },
    })

    wrapper = shallowMount(favorite, {
      store,
      localVue,
    })
  })

  test('Vueインスタンスが存在するのか確認', () => {
    expect(wrapper.vm).toBeTruthy()
  })
  // test('loggedInがfalseのパターンテスト', () => {
  //   wrapper.vm.middleware()
  //   if (wrapper.vm.store.state.auth.loggedIn === true) {
  //     console.log(wrapper.vm)
  //   } else {
  //     console.log(wrapper.vm)
  //   }
  //   wrapper.vm.store.state.auth.loggedIn = false
  //   wrapper.vm.middleware()
  //   if (wrapper.vm.store.state.auth.loggedIn === true) {
  //     console.log(wrapper.vm)
  //   } else {
  //     console.log(wrapper.vm)
  //   }
})
