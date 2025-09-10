const CommonFunctions = require("../commonFunctions/CommonFunctions");

class LoginPage extends CommonFunctions {
  constructor(page) {
    super(page); // inherit CommonFunctions utilities

    // 🔹 Define locators
    this.usernameInput = page.locator('input[name="name"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.confPasswordInput = page.locator('input[name="confirmpassword"]');
    this.loginButton = page.locator('text=LOGIN');
  }

  // 🔹 Navigate to login page
  async navigate(url) {
    await this.page.goto(url);
  }

  // 🔹 Enter username
  async enterUsername(username) {
    await this.fillText(this.usernameInput, username);
  }

  // 🔹 Enter password
  async enterPassword(password) {
    await this.fillText(this.passwordInput, password);
  }

  // 🔹 Enter confirm password
  async enterConfirmPassword(confPassword) {
    await this.fillText(this.confPasswordInput, confPassword);
  }

  // 🔹 Click login button
  async clickLogin() {
    await this.clickElement(this.loginButton);
  }

  // 🔹 Click login button
  async verifyPage2Title(expectedTitle) {
    await this.verifyTitle(expectedTitle);
  }

  // 🔹 Perform full login
  async login(username, password, confPassword) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.enterConfirmPassword(confPassword);
    await this.clickLogin();
    await this.verifyPage2Title("Reg2");
  }
}

module.exports = LoginPage;
