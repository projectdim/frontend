import Header from './Header.vue'

describe('<Header />', () => {
  it('renders', () => {
    // see: https://test-utils.vuejs.org/guide/
    cy.mount(Header)
  })
})