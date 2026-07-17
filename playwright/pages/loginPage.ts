import { Page, expect } from "@playwright/test";
import { app } from "../locators";
import { CommonPage } from "./commonPage";

/**
    Author: Tanmay Wadibhasme.

    Date: 17/07/2026
    
    Purpose: 
      Encapsulate login page interactions for the test suite.
    
      Description: 
      Provides methods to enter credentials, submit the login form, and verify navigation to the dashboard after successful authentication.
      

**/

export class LoginPage {
  readonly page: Page;
  readonly _commonPages: CommonPage;

  constructor(page: Page) {
    this.page = page;
    this._commonPages = new CommonPage(this.page);
  }

  async enterLoginDetails(username: string, password: string) {
    await this._commonPages.enterRecordByPlaceHolder("Username", username);
    await this._commonPages.enterRecordByPlaceHolder("Password", password);
  }

  async clickOnSubmitButton() {
    await this._commonPages.clickOn_button(`${app.buttons.LOGIN_SUBMIT}`);
  }

  async loginAsAdmin(username: string, password: string) {
    await this.page.context().clearCookies();
    await this.page.goto("/web/index.php/auth/login", {
      waitUntil: "networkidle",
      timeout: 120000,
    });
    await this.page
      .getByPlaceholder("Username")
      .waitFor({ state: "visible", timeout: 20000 });
    await this.enterLoginDetails(username, password);
    await Promise.all([
      this.page.waitForURL("**/dashboard**", { timeout: 20000 }),
      this.clickOnSubmitButton(),
    ]);
    await expect(this.page.locator('h6:has-text("Dashboard")')).toBeVisible({
      timeout: 20000,
    });
  }
}
