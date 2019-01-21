import { shallowMount } from '@vue/test-utils'
import Navbar from '@/components/Navbar.vue'

describe('Navbar.vue', () => {
  it('Navbar component props', () => {
    const wrapper = shallowMount(Navbar, {
      propsData: {
        pageType: 'trailers',
        settings: {

        },
        isMobile: false
      }
    })
    expect(wrapper.findAll('.sidebar-button')).toHaveLength(3)
  })

  it('matches snapshot', () => {
    const wrapper = shallowMount(Navbar, {
      propsData: {
        pageType: 'trailers',
        settings: {

        },
        isMobile: false
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
