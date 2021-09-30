import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Vuex from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import Register from '../pages/user/register.vue'
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('ValidationObserver', ValidationObserver)
localVue.component('ValidationProvider', ValidationProvider)

describe('ユーザー登録画面のテスト', () => {
  let stubs
  let mocks
  let store
  let actions
  beforeEach(() => {
    actions = {
      'users/register': jest.fn(),
    }
    // eslint-disable-next-line import/no-named-as-default-member
    store = new Vuex.Store({
      state: {
        auth: { loggedIn: true },
      },
      // 商品が入っている場合の"order/getters"のモック
      actions,
      // actions: {
      //   'users/register': jest.fn(),
      // },
    })
    stubs = {
      RouterLink: RouterLinkStub,
    }
    mocks = {
      $axios: {
        $post: jest.fn(() =>
          Promise.resolve({
            name: 'test',
            email: 'test@gmail.com',
            password: 'password',
          })
        ),
      },
    }
  })
  test('ユーザー登録画面のVueインスタンスが存在するのか確認', () => {
    const wrapper = mount(Register, {
      stubs,
      localVue,
      store,
    })
    expect(wrapper.vm).toBeTruthy()
    console.log(wrapper.html())
  })
  test('登録ボタン押下時にイベントが発火することを確認', () => {
    const wrapper = mount(Register, {
      stubs,
      localVue,
      mocks,
      store,
    })
    // wrapper.find('.button').trigger('click')
    wrapper.vm.registerUser()
    expect(actions['users/register']).toHaveBeenCalled()
    // console.log(wrapper)
    // console.log(store._actions["users/register"])
    // store.dispatch("users/register")
    // expect(store._actions["users/register"]).toHaveBeenCalled()
  })
})
