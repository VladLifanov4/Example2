export class HerokuAppPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('/'); // Использует baseURL из конфигурации
  }

  async setCookie(name, value) {
    await this.page.context().addCookies([
      { name, value, url: this.page.context()._options.baseURL },
    ]);
  }

  async isCookiesExists(name) {
    const cookies = await this.page.context().cookies(this.page.context()._options.baseURL);
    return cookies.some(cookie => cookie.name === name);
  }
}