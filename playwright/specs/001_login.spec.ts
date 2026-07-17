import { test } from "../pages/fixtures";
import { expect } from "@playwright/test";
import * as loginData from "../data/login.json";
import { app } from "../locators";

/**
    Author: Tanmay Wadibhasme.

    Date: 17/07/2026
    
    Purpose: 
      Verify valid admin login flow in OrangeHRM.
      
    Description: 
      Ensures an admin can sign in with valid credentials and reach the dashboard page.

      

**/

test.describe.configure({ mode: "serial" });

test.describe("OrangeHRM - Login", () => {
  test("TC_UM_01 - Admin can log in with valid credentials", async ({
    sharedPage,
    pages,
  }) => {
    await test.step("Enter credentials and submit", async () => {
      await pages._loginPage.enterLoginDetails(
        loginData.USERNAME,
        loginData.PASSWORD,
      );
      await pages._loginPage.clickOnSubmitButton();
    });

    await test.step("Validate dashboard is shown", async () => {
      await expect(
        sharedPage.locator(`${app.pageLayout.DASHBOARD_BREADCRUMB}`),
      ).toBeVisible({ timeout: 20000 });
    });
  });
});
