import { shallowMount} from '@vue/test-utils'
// import Vuex from 'vuex'
import Complete from "../pages/orders/complete.vue"
// const localVue = createLocalVue()
// localVue.use(Vuex)

describe('注文完了画面ののテスト', () => {
  test('注文完了画面のVueインスタンスが存在するのか確認', () => {
    const wrapper =shallowMount(Complete)
    expect(wrapper.vm).toBeTruthy()
    console.log(wrapper.html())
  })
  test('「買い物を続ける」ボタンのメソッド発火の確認', () => {
    const mockRouterPush = jest.fn();
    const wrapper =shallowMount(Complete,{
      mocks:{
        $router: {
          push: mockRouterPush
        },
      },
    })
    wrapper.find('.button05').trigger('click');
    expect(mockRouterPush).toHaveBeenCalledWith("/");
  })
})