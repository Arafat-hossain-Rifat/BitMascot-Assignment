# EventBookings Login & Signup Flow Automation (Playwright + JavaScript)

## 📌 Project Overview
This project automates the **login** and **signup** flows for [EventBookings](https://www.eventbookings.com/) using **Playwright with JavaScript**.  
It follows the **Page Object Model (POM)** for maintainability, includes **data-driven testing**, supports **multi-browser** execution, and manages credentials securely via `.env`.  

The tests cover:
- **Signup Flow** (unique email, used email, weak password, post-signup login/logout)
- **Login Flow** (valid credentials, invalid formats, non-existent users, empty fields)
- **Cross-browser & mobile testing** (Chromium, Firefox, Safari, mobile emulation)
- **Screenshot capture** after successful signup
- **Tag-based test filtering** (`@login`, `@signup`)

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
git clone <your-repo-url>
cd <your-repo-folder>

2️⃣ Install dependencies

npm install

3️⃣ Install Playwright browsers

npx playwright install


🔑 Configure Credentials

Sensitive data like email and password are stored in a .env file at the project root.

Create a .env file:

EMAIL=your.email@example.com
PASSWORD=YourSecurePassword123

Note:

Use a real EventBookings account for testing.

For signup tests, Gmail aliasing (yourname+random123@gmail.com) is used to generate unique test accounts.

▶️ Running the Tests

Run all tests :

npx playwright test

Run tests in headed mode :

npx playwright test --headed

Run tests in a specific browser :

npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project="Mobile Chrome"

Run only login tests :

npx playwright test -g "@login"

Run only signup tests :

npx playwright test -g "@signup"

Run any specific test in a specific browser :

npx playwright test signup.spec.js --project=chromium

🛠 Project Structure

.
├── pages/
│   ├── LoginPage.js
│   ├── SignupPage.js
│   ├── DashboardPage.js
├── tests/
│   ├── login.spec.js
│   ├── signup.spec.js
├── playwright.config.js
├── .env               
├── package.json

Project Root Overview : 

pages/

Contains Page Object Model (POM) files. Each file represents a web page or a component with locators and methods to interact with the page. This improves code reusability and maintainability.

LoginPage.js — Handles login page interactions

SignupPage.js — Handles signup page interactions

DashboardPage.js — Handles dashboard page interactions after login/signup


tests/

Contains Playwright test scripts organized by feature or flow. These tests use the page objects from pages/ to perform UI automation.

login.spec.js — Tests related to the login functionality

signup.spec.js — Tests related to the signup functionality


playwright.config.js

The configuration file for Playwright test runner. Defines global settings such as base URL, browser projects (Chromium, Firefox, Webkit), timeouts, retries, headless mode, and test directories.


.env

Environment variables file used to securely store sensitive data like email and password credentials. This keeps secrets out of your codebase.


package.json

Manages project dependencies, scripts, and metadata. This file declares which npm packages are used (e.g., Playwright) and how to run tests or other scripts.





Page Object Model (POM) ensures reusability and clean test methods.

playwright.config.js defines baseURL, retries, timeouts, multiple browsers, and mobile view.

📊 Test Coverage Summary

The Playwright test suite covers both positive and negative scenarios for core user flows. 
Signup tests validate registration with a unique email, handle errors for used emails and weak passwords, and capture a screenshot upon successful signup.
Login tests confirm valid credentials work while verifying proper error handling for empty forms, invalid emails, wrong credentials, and non-existing users,
ensuring functionality across multiple browsers including Chromium, Firefox, Safari, and mobile. 
Multi-browser execution is configured in playwright.config.js, and data-driven testing is implemented using email aliasing and a variety of invalid inputs,
making the suite easily extendable for future scenarios.

⚠️ Known Limitations

If CAPTCHA appears during signup/login, automation will fail (Playwright cannot solve CAPTCHA).

Test accounts remain in the EventBookings system unless manually deleted.

Email confirmation flow is not automated — tests assume immediate access after signup.

📸 Reports & Screenshots

HTML Test Report: Generated automatically after each run (playwright-report/).

Screenshots: Captured for failed tests, and after successful signup (signup-success.png).

Videos & Traces: Retained for failed tests to aid debugging.
