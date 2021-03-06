import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Vuex from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import Login from '../pages/user/login.vue'
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('ValidationObserver', ValidationObserver)
localVue.component('ValidationProvider', ValidationProvider)

describe('ユーザー登録画面のテスト', () => {
  let stubs
  let actions
  let mocks
  let store
  beforeEach(() => {
    actions = {
      'users/login': jest.fn(),
    }

    // eslint-disable-next-line import/no-named-as-default-member
    store = new Vuex.Store({
      state: {
        auth: { loggedIn: true },
      },
      // 商品が入っている場合の"order/getters"のモック
      actions,
    })
    stubs = {
      RouterLink: RouterLinkStub,
    }
  })
  test('ユーザー登録画面のVueインスタンスが存在するのか確認', () => {
    const wrapper = mount(Login, {
      stubs,
      localVue,
      store,
    })
    expect(wrapper.vm).toBeTruthy()
  })
  test('登録ボタン押下時にイベントが発火することを確認', () => {
    const wrapper = mount(Login, {
      stubs,
      localVue,
      mocks,
      store,
    })

    wrapper.vm.loginUser()
    expect(actions['users/login']).toHaveBeenCalled()
    // const email = wrapper.get('.email')
    // const password = wrapper.get('.password')
    // email.setValue('テストユーザー1')
    // password.setValue('password')
    // console.log(wrapper.html())
    // wrapper.find('.button').trigger('click')
    // console.log(wrapper)
    // console.log(store._actions["users/register"])
    // store.dispatch("users/register")
    // expect(store._actions["users/register"]).toHaveBeenCalled()
  })
})
