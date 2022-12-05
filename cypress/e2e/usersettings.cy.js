import randomString from "../helpers.js"

describe('user settings', () => {
  before(() => {
    cy.fixture('testUser.json').then((user) => {
      this.user = user
    });
  });

  it('check if the user can access settings tab and all the disabled elements are rendered correctly', () => {
    cy.visit('http://localhost:5173/');
    cy.login(this.user);

    cy.get('#settings').click();
    cy.get('body').find('#userSettings').should('be.visible')

    cy.get('#setting-mail').find('input').should('be.disabled');
    cy.get('#updateData').should('be.disabled');
  });

  it('check if the user can change his name', () => {

    const uuid = () => Cypress._.random(0, 100)
    const id = uuid()
    const testname = `testname${id}`

    cy.get('#setting-name').find('input').clear().type(testname);
    cy.get('#updateData').should('not.be.disabled');
    cy.get('#updateData').click();
    cy.intercept('/api/v1/users/info').then((res) => {
      console.log(res)
    })
  });

});