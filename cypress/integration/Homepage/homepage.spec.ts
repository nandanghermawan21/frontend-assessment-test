describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('login', () => {
    cy.get('h1').contains('Welcome to ');
  });
});

export {};
