describe('Login and Authentication Flow', () => {
    beforeEach(() => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    });
  
    it('Valid User Login', () => {
      cy.fixture('users.json').then((users) => {
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type(users.validUser.username);
        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type(users.validUser.password);
        cy.get('.oxd-button').click();
        cy.url().should('include', '/dashboard');
      });
    });
  
    it('Invalid User Login', () => {
      cy.fixture('users.json').then((users) => {
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type(users.invalidUser.username);
        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type(users.invalidUser.password);
        cy.get('.oxd-button').click();
        cy.get('.oxd-alert-content > .oxd-text').should('contain', 'Invalid credentials');
      });
    });

    
    it('Should show error for empty fields', () => {
        cy.fixture('users.json').then((users) => {
        cy.get('.oxd-button').click();
        cy.contains('Required'); // Example error message for empty fields
      });
    });

    it('Should show error for incorrect username', () => {
      cy.fixture('users.json').then((users) => {
      cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type(users.invalidUser.username);
      cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type(users.validUser.password);
      cy.get('.oxd-button').click();
      cy.contains('Invalid credentials');
    });
  });
  
    it('Should show error for incorrect password', () => {
      cy.fixture('users.json').then((users) => {
      cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type(users.invalidUser.username);
      cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type(users.validUser.password);
      cy.get('.oxd-button').click();
      cy.contains('Invalid credentials');
    });
  });
  
    it('Forgot Password', () => {
      cy.fixture('users.json').then((users) => {
        cy.get('.orangehrm-login-forgot > .oxd-text').click();
        cy.get('.oxd-input').type(users.validUser.username);
        cy.get('.oxd-button--secondary').click();
        cy.get('.orangehrm-card-container').should('contain', 'Reset Password link sent successfully');
        // Additional steps if required: Mock email service and verify the email received
      });
    });
   
    // Additional test cases for different user roles and permissions
    it('User Role - Admin access', () => {
        cy.fixture('users.json').then((users) => {
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type(users.adminUser.username);
        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type(users.adminUser.password);
        cy.get('.oxd-button').click();
        cy.get('.oxd-sidepanel-body').should('be.visible','Admin');
      });
    });
    
      it('User Role - User access', () => {
        cy.fixture('users.json').then((users) => {
          cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type(users.otherUser.username);
          cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type(users.otherUser.password);
          cy.get('.oxd-button').click();
          cy.get('.oxd-sidepanel-body:visible').should('not.exist');
        });
      });
    });