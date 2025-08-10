class SignupPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.signInButton = '#SignIn'; 
    this.signUpLink = 'a[href="/b/member/users/login/1"]';
    this.firstNameInput = '#FirstName';
    this.lastNameInput = '#LastName';
    this.emailInput = '#Email';
    this.passwordInput = '#Password';
    this.confirmPasswordInput = '#ConfirmPassword';
    this.signUpButton = '#btnSubmit';
    this.dashboardSelector = '#hmAcntPg';
    this.logoutButton = '#logoutButton'; 
    this.errorMessage = 'div.error-msg.validation-summary-errors'; 
    this.weakPasswordError = 'span.error-msg.field-validation-error[data-valmsg-for="Password"]'; 
    this.usedEmailError = 'span.error-msg.field-validation-error[data-valmsg-for="Email"]'; 
  }

  async navigateToSignup() {
    await this.page.goto('https://www.eventbookings.com/');
    await this.page.waitForSelector(this.signInButton, { state: 'visible', timeout: 10000 });
    await this.page.click(this.signInButton);

    await this.page.waitForSelector(this.signUpLink, { state: 'visible', timeout: 10000 });
    await this.page.click(this.signUpLink);
  }

  async createNewUser(firstName, lastName, email, password, confirmPassword = password) {
    await this.page.waitForSelector(this.firstNameInput, { state: 'visible', timeout: 20000 });
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.fill(this.confirmPasswordInput, confirmPassword);
    await this.page.click(this.signUpButton);
  }

  async getUsedEmailError() {
    await this.page.waitForSelector(this.usedEmailError, { timeout: 30000 });
    return await this.page.textContent(this.usedEmailError);
  }

  async isWeakPasswordErrorVisible() {
  await this.page.waitForSelector(this.weakPasswordError, { state: 'visible', timeout: 30000 });
  return true;
}

  async isSignupSuccessful() {
    await this.page.waitForSelector(this.dashboardSelector, { state: 'visible', timeout: 50000 });
    return true;
  }

  async takeScreenshot(path) {
    await this.page.screenshot({ path, fullPage: true });
  }

  async logout() {
    await this.page.waitForSelector(this.logoutButton, { state: 'visible', timeout: 30000 });
    await this.page.click(this.logoutButton);
  }
}

module.exports = { SignupPage };
