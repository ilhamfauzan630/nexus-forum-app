/**
 * - Register spec
 *   - should display register page correctly
 *   - should display alert when username is empty
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email is already registered
 *   - should display login page when registration is successful
 */

describe('Register spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/register');
  });

  it('should display register page correctly', () => {
    cy.get('input[placeholder="Username"]').should('be.visible');
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.contains('button', 'Register').should('be.visible');
    cy.contains('Create your account').should('be.visible');
  });

  it('should display alert when username is empty', () => {
    cy.on('window:alert', (message) => {
      expect(message).to.equal('"name" is not allowed to be empty');
    });

    cy.get('input[placeholder="Email"]')
      .type('registertest@gmail.com');

    cy.get('input[placeholder="Password"]')
      .type('Saikyou123');

    cy.contains('button', 'Register').click();
  });

  it('should display alert when email is empty', () => {
    cy.on('window:alert', (message) => {
      expect(message).to.equal('"email" is not allowed to be empty');
    });

    cy.get('input[placeholder="Username"]')
      .type('Register Test');

    cy.get('input[placeholder="Password"]')
      .type('Saikyou123');

    cy.contains('button', 'Register').click();
  });

  it('should display alert when password is empty', () => {
    cy.on('window:alert', (message) => {
      expect(message).to.equal('"password" is not allowed to be empty');
    });

    cy.get('input[placeholder="Username"]')
      .type('Register Test');

    cy.get('input[placeholder="Email"]')
      .type('registertest@gmail.com');

    cy.contains('button', 'Register').click();
  });

  it('should display alert when email is already registered', () => {
    cy.on('window:alert', (message) => {
      expect(message).to.equal('email is already taken');
    });

    cy.get('input[placeholder="Username"]')
      .type('Muhammad Ilham Fauzan');

    cy.get('input[placeholder="Email"]')
      .type('fauzanilham630@gmail.com');

    cy.get('input[placeholder="Password"]')
      .type('Saikyou123');

    cy.contains('button', 'Register').click();
  });

  it('should display login page when registration is successful', () => {
    const uniqueEmail = `fauzan${Date.now()}@gmail.com`;

    cy.get('input[placeholder="Username"]')
      .type('Muhammad Ilham Fauzan');

    cy.get('input[placeholder="Email"]')
      .type(uniqueEmail);

    cy.get('input[placeholder="Password"]')
      .type('Saikyou123');

    cy.contains('button', 'Register').click();

    cy.get('input[placeholder="Email"]', { timeout: 10000 })
      .should('be.visible');

    cy.get('input[placeholder="Password"]')
      .should('be.visible');

    cy.contains('button', 'Login')
      .should('be.visible');

    cy.contains('Create your account')
      .should('not.exist');
  });
});