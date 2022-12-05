describe('overview autocomplete', () => {
  it('checks if google autocomplete is working on the overview page', () => {
    cy.visit('http://127.0.0.1:5173/main/overview');
    cy.get('input').type('Зодчих 19, Zodchykh Street, Вінниця, Vinnytsia Oblast, Ukraine');
    cy.get('input').click().type('{enter}');
  });
});
