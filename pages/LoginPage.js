class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.signInButton = '#SignIn';
    this.loginLink = 'a[href="/b/member/users/login"]';
    this.emailInput = '#Email';
    this.passwordInput = '#Password';
    this.loginButton = 'button[type="submit"]';
    this.dashboardSelector = '#hmAcntPg';
    this.emailError = '.error-msg.field-validation-error';
    this.passwordError = 'span[data-valmsg-for="Password"].error-msg.field-validation-error';
    this.generalError = 'div.error-msg.validation-summary-errors ul li';
  }

  async navigateToLogin() {
    await this.page.goto('https://www.eventbookings.com/');
    await this.page.waitForSelector(this.signInButton, { state: 'visible', timeout: 30000 });
    await this.page.click(this.signInButton);
    await this.page.waitForSelector(this.loginLink, { state: 'visible', timeout: 30000 });
    await this.page.click(this.loginLink);
  }

  async loginWithCredentials(email, password) {
    await this.page.waitForSelector(this.emailInput, { state: 'visible', timeout: 30000 });
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async isLoginSuccessful() {
    await this.page.waitForSelector(this.dashboardSelector, { state: 'visible', timeout: 50000 });
    return true;
  }

  async isEmailErrorVisible() {
    await this.page.waitForSelector(this.emailError, { state: 'visible', timeout: 30000 });
    return true;
  }

  async isPasswordErrorVisible() {
    await this.page.waitForSelector(this.passwordError, { state: 'visible', timeout: 30000 });
    return true;
  }

  async isGeneralErrorVisible() {
    await this.page.waitForSelector(this.generalError, { state: 'visible', timeout: 50000 });
    return true;
  }
}

module.exports = { LoginPage };
