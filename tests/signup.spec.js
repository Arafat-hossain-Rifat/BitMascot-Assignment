const { test, expect } = require('@playwright/test');
const { SignupPage } = require('../pages/SignupPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { LoginPage } = require('../pages/LoginPage');
require('dotenv').config(); 

function generateRandomEmail(baseEmail) {
  const randomNumber = Math.floor(Math.random() * 100000);
  const [name, domain] = baseEmail.split('@');
  return `${name}+${randomNumber}@${domain}`;
}

function generateRandomName() {
  const names = ['John', 'Jane', 'Alice', 'Bob', 'Charlie', 'Diana'];
  return names[Math.floor(Math.random() * names.length)];
}

test.describe('@signup Signup Flow Tests', () => {

  test('Positive: Signup, auto-login, logout, and login again', async ({ page }) => {
    const signupPage = new SignupPage(page);
    const dashboardPage = new DashboardPage(page);
    const loginPage = new LoginPage(page);

    const uniqueEmail = generateRandomEmail(process.env.EMAIL);
    const password = process.env.PASSWORD;
    const firstName = generateRandomName();
    const lastName = generateRandomName();

    await signupPage.navigateToSignup();
    await signupPage.createNewUser(firstName, lastName, uniqueEmail, password);
    const signupSuccess = await signupPage.isSignupSuccessful();
    expect(signupSuccess).toBeTruthy();

    await signupPage.takeScreenshot('signup-success.png');

    await dashboardPage.logout();

    await loginPage.navigateToLogin();
    await loginPage.loginWithCredentials(uniqueEmail, password);
    const loginSuccess = await loginPage.isLoginSuccessful();
    expect(loginSuccess).toBeTruthy();
  });

  test('Negative: Signup with already used email', async ({ page }) => {
    const signupPage = new SignupPage(page);
    const usedEmail = process.env.EMAIL;
    const firstName = generateRandomName();
    const lastName = generateRandomName();
    await signupPage.navigateToSignup();
    await signupPage.createNewUser(firstName, lastName, usedEmail, process.env.PASSWORD);
    await page.waitForSelector(signupPage.usedEmailError, { state: 'visible', timeout: 20000 });
    const isErrorVisible = await page.isVisible(signupPage.usedEmailError);
    expect(isErrorVisible).toBeTruthy();
  });

  test('Negative: Signup with weak password', async ({ page }) => {
    const signupPage = new SignupPage(page);
    const uniqueEmail = generateRandomEmail(process.env.EMAIL);
    const firstName = generateRandomName();
    const lastName = generateRandomName();
    const weakPassword = '123';
    await signupPage.navigateToSignup();
    await signupPage.createNewUser(firstName, lastName, uniqueEmail, weakPassword);
    const isWeakPassErrorVisible = await signupPage.isWeakPasswordErrorVisible();
    expect(isWeakPassErrorVisible).toBeTruthy();
  });

});
