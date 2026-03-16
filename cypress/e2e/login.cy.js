describe('Login Flow', () => {
  it('should login successfully', () => {
    cy.visit('http://localhost:5173/login');

    cy.get('input[type=email]').type('ariska@gmail.com');
    cy.get('input[type=password]').type('ariska');

    cy.get('button').contains('Login').click();

    cy.get('button').contains('Logout').should('be.visible');
  });
});
