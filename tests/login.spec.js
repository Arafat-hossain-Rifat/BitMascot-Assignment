const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
require('dotenv').config(); 

test.describe('@login Login Flow Tests', () => {

  test('Positive: Login with valid credentials', async ({ page }) => {
     const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.loginWithCredentials(process.env.EMAIL, process.env.PASSWORD);
    const loginSuccess = await loginPage.isLoginSuccessful();
    expect(loginSuccess).toBeTruthy();
  });

test.describe('@login Negative Login Flow Tests', () => {

  test('Empty form submission shows email and password errors', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.loginWithCredentials('', '');
    expect(await loginPage.isPasswordErrorVisible()).toBeTruthy();
    expect(await loginPage.isEmailErrorVisible()).toBeTruthy();
    
  });

  test('Invalid email format shows email error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.loginWithCredentials('abc.com', 'SomePassword123!');
    expect(await loginPage.isEmailErrorVisible()).toBeTruthy();
  });

  test('Non-existing user shows general error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.loginWithCredentials('nonexistinguser@example.com', 'SomePassword123!');
    expect(await loginPage.isGeneralErrorVisible()).toBeTruthy();
  });

});

});
