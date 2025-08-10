class DashboardPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.dashboardSelector =  '#hmAcntPg';
    this.logoutButton = 'a.dropdown-item[href="/b/member/logout"]';
  }

  async isDashboardVisible() {
  await this.page.waitForSelector(this.dashboardSelector, { state: 'visible', timeout: 20000 });
  return true;
}

  async logout() {
    await this.page.waitForSelector(this.logoutButton, { state: 'visible', timeout: 30000 });
    await this.page.click(this.logoutButton);
  }
}

module.exports = { DashboardPage };
