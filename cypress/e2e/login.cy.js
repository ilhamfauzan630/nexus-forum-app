/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should display login page correctly', () => {
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.contains('button', 'Login').should('be.visible');
  });

  it('should display alert when email is empty', () => {
    cy.on('window:alert', (message) => {
      expect(message).to.equal('"email" is not allowed to be empty');
    });

    cy.get('input[placeholder="Password"]')
      .type('Saikyou123');

    cy.contains('button', 'Login').click();
  });

  it('should display alert when password is empty', () => {
    cy.on('window:alert', (message) => {
      expect(message).to.equal('"password" is not allowed to be empty');
    });

    cy.get('input[placeholder="Email"]')
      .type('fauzanilham630@gmail.com');

    cy.contains('button', 'Login').click();
  });

  it('should display alert when email and password are wrong', () => {
    cy.on('window:alert', (message) => {
      expect(message).to.equal('email or password is wrong');
    });

    cy.get('input[placeholder="Email"]')
      .type('xxx@mail.com');

    cy.get('input[placeholder="Password"]')
      .type('xxx');

    cy.contains('button', 'Login').click();
  });

  it('should display homepage when email and password are correct', () => {
    cy.get('input[placeholder="Email"]')
      .type('fauzanilham630@gmail.com');

    cy.get('input[placeholder="Password"]')
      .type('Saikyou123');

    cy.contains('button', 'Login').click();

    cy.contains('button', 'Sign out', { timeout: 10000 })
      .should('be.visible');

    cy.contains('Nexus Forum').should('be.visible');
    cy.get('input[placeholder="Email"]').should('not.exist');
  });
});