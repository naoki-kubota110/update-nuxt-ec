import { mount, createLocalVue,RouterLinkStub } from '@vue/test-utils'
import Vuex from 'vuex'
import {
  ValidationProvider,
  ValidationObserver
} from 'vee-validate'
import Register from "../pages/user/register.vue"
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('ValidationObserver', ValidationObserver)
localVue.component('ValidationProvider', ValidationProvider)

describe('ユーザー登録画面のテスト', () => {
  let stubs
  beforeEach(() => {
    stubs = {
      RouterLink: RouterLinkStub
    }
  })
  test('ユーザー登録画面のVueインスタンスが存在するのか確認', () => {
    const wrapper = mount(Register,{
      stubs,
      localVue
    })
    expect(wrapper.vm).toBeTruthy()
    console.log(wrapper.html())
  })
  test('登録ボタン押下時にイベントが発火することを確認', () => {
    const wrapper = mount(Register,{
      stubs,
      localVue
    })
    wrapper.find(".button").trigger("click")
  })
})