const { expect } = require("@playwright/test");
const { allure } = require("allure-playwright");
const fs = require("fs");
const path = require("path");

class CommonFunctions {
  constructor(page) {
    this.page = page;
  }

  // ✅ Generic wait for element
  async waitForElement(selector, state = "visible", timeout = 15000) {
    return allure.step(`Wait for element ${selector} to be ${state}`, async () => {
      try {
        if (typeof selector === "string") {
          await this.page.waitForSelector(selector, { state, timeout });
        } else {
          await selector.waitFor({ state, timeout });
        }
      } catch (error) {
        throw new Error(`❌ Element ${selector} not in state '${state}' after ${timeout}ms`);
      }
    });
  }

  // ✅ Read test data from JSON file for a given key
  async readTestData(fileName, key) {
    return allure.step(`Read key '${key}' from ${fileName}`, async () => {
      try {
        const filePath = path.resolve(__dirname, "../testData", fileName);
        const rawData = fs.readFileSync(filePath, "utf-8");
        const jsonData = JSON.parse(rawData);

        if (!(key in jsonData)) {
          throw new Error(`❌ Key '${key}' not found in ${fileName}`);
        }

        return jsonData[key];
      } catch (error) {
        throw new Error(`❌ Error reading test data '${key}' from ${fileName}: ${error}`);
      }
    });
  }

  // ✅ Wait until element is clickable
  async waitForClickable(selector, timeout = 15000) {
    return allure.step(`Wait for element ${selector} to be clickable`, async () => {
      await this.waitForElement(selector, "visible", timeout);
      const element = typeof selector === "string" ? this.page.locator(selector) : selector;

      try {
        await expect(element).toBeEnabled({ timeout });
      } catch (error) {
        throw new Error(`❌ Element ${selector} not clickable after ${timeout}ms`);
      }
    });
  }

  // ✅ Click element with dynamic wait
  async clickElement(selector, options = {}) {
    return allure.step(`Click on element ${selector}`, async () => {
      await this.waitForClickable(selector, options.timeout || 5000);
      const element = typeof selector === "string" ? this.page.locator(selector) : selector;
      await element.click(options);
    });
  }

  // ✅ Fill input field
  async fillText(selector, text, timeout = 15000) {
    return allure.step(`Fill text '${text}' into ${selector}`, async () => {
      await this.waitForElement(selector, "visible", timeout);
      const element = typeof selector === "string" ? this.page.locator(selector) : selector;
      await element.fill(text);
    });
  }

  // ✅ Get text
  async getText(selector, timeout = 5000) {
    return allure.step(`Get text from ${selector}`, async () => {
      await this.waitForElement(selector, "visible", timeout);
      const element = typeof selector === "string" ? this.page.locator(selector) : selector;
      return await element.textContent();
    });
  }

  // ✅ Clear & Set text
  async setText(selector, text, timeout = 5000) {
    return allure.step(`Set text '${text}' in ${selector}`, async () => {
      await this.waitForElement(selector, "visible", timeout);
      const element = typeof selector === "string" ? this.page.locator(selector) : selector;
      await element.fill("");
      await element.type(text);
    });
  }

  // ✅ Select dropdown
  async selectDropdown(selector, option, timeout = 5000) {
    return allure.step(`Select option '${option}' from dropdown ${selector}`, async () => {
      await this.waitForElement(selector, "visible", timeout);
      const element = typeof selector === "string" ? this.page.locator(selector) : selector;
      await element.selectOption({ label: option }).catch(async () => {
        await element.selectOption({ value: option });
      });
    });
  }

  // ✅ Wait for frame & return it
  async switchToFrame(frameNameOrSelector, timeout = 5000) {
    return allure.step(`Switch to frame ${frameNameOrSelector}`, async () => {
      let frame;
      try {
        await this.page.waitForTimeout(1000); // small buffer
        if (typeof frameNameOrSelector === "string") {
          frame = this.page.frame({ name: frameNameOrSelector }) ||
                  this.page.frameLocator(frameNameOrSelector).frame();
        } else {
          frame = frameNameOrSelector; // already a frame object
        }
        if (!frame) throw new Error(`Frame not found: ${frameNameOrSelector}`);
        return frame;
      } catch (error) {
        throw new Error(`❌ Error switching to frame ${frameNameOrSelector}: ${error}`);
      }
    });
  }

  // ✅ Date picker
  async selectDate(selector, dateString, timeout = 5000) {
    return allure.step(`Select date '${dateString}' in ${selector}`, async () => {
      await this.waitForElement(selector, "visible", timeout);
      const element = typeof selector === "string" ? this.page.locator(selector) : selector;
      await element.fill(dateString);
      await this.page.keyboard.press("Enter");
    });
  }

  // ✅ Verify page title (exact or partial match)
  async verifyTitle(expectedTitle, { contains = false, timeout = 5000 } = {}) {
    return allure.step(`Verify page title ${contains ? "contains" : "equals"} '${expectedTitle}'`, async () => {
      try {
        await this.page.waitForFunction(
          (expected, contains) => {
            return contains ? document.title.includes(expected) : document.title === expected;
          },
          expectedTitle,
          contains,
          { timeout }
        );

        const actualTitle = await this.page.title();

        if (contains) {
          if (!actualTitle.includes(expectedTitle)) {
            throw new Error(`❌ Expected title to contain "${expectedTitle}", but got "${actualTitle}"`);
          }
        } else {
          if (actualTitle !== expectedTitle) {
            throw new Error(`❌ Expected title to be "${expectedTitle}", but got "${actualTitle}"`);
          }
        }

        return actualTitle;
      } catch (error) {
        throw new Error(`❌ Title verification failed for "${expectedTitle}": ${error}`);
      }
    });
  }
}

module.exports = CommonFunctions;
