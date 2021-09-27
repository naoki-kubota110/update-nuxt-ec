import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import favorite from '../pages/user/favorite'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('favoriteコンポーネントのテスト', () => {
  let store
  let favoriteItem
  let wrapper

  beforeEach(() => {
    // Vuexストアのモックを作成する
    favoriteItem = {
      favoriteItem: [],
    }
    // eslint-disable-next-line import/no-named-as-default-member
    store = new Vuex.Store({
      modules: {
        favoriteItem,
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
})
