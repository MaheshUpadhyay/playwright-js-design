
const { test } = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");
const CommonFunctions = require("../commonFunctions/CommonFunctions");

test("Login test using Valid Credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const common = new CommonFunctions(page);

  const url = await common.readTestData("testData.json", "url");

  await loginPage.navigate(url);

  // ✅ Get object (validUser)
  const userData = await common.readTestData("testData.json", "validUser");

  // Perform login using reusable POM method
  await loginPage.login(userData.username, userData.password, userData.confirmPassword);

  // Validate after login
  //await loginPage.waitForElement("text=Welcome", "visible", 10000);
});

test("Login test using invalid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const common = new CommonFunctions(page);

  const url = await common.readTestData("testData.json", "url");

  await loginPage.navigate(url);

  // ✅ Get object (validUser)
  const userData = await common.readTestData("testData.json", "invalidUser");

  // Perform login using reusable POM method
  await loginPage.login(userData.username, userData.password, userData.confirmPassword);

  // Validate after login
  //await loginPage.waitForElement("text=Welcome", "visible", 10000);
});
