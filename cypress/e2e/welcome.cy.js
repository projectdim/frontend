describe('language-changing', () => {
  it('checks if language is changing', () => {
    cy.visit('http://localhost:5173/');
    const langChangerButton = cy.get('#dropButton');
    langChangerButton.should('have.text', 'Українська');
    langChangerButton.click()
    cy.contains('English').click()
    langChangerButton.should('have.text', 'English');
  });
});


describe('search-input', () => {
  it('checks if search input is visible and working', () => {
    cy.visit('http://localhost:5173/');
    const searchInput = cy.get('input')
    searchInput.type('Вінниця');
    searchInput.text().should('be.a')
    const closeButton = cy.get('img');
    closeButton.click();

  });
});

