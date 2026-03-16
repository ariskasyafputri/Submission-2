describe('Login Flow', () => {
  it('should login successfully', () => {
    cy.visit('http://localhost:5173/login');

    cy.get('input[type=email]').type('test@mail.com');
    cy.get('input[type=password]').type('123456');

    cy.get('button').contains('Login').click();

    cy.url().should('include', '/');
  });
});
