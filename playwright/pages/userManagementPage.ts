import { Page, Locator, expect } from "@playwright/test";
import { app } from "../locators";
import { CommonPage } from "./commonPage";

/**
    Author: Tanmay Wadibhasme.

    Date: 17/07/2026
    
    Purpose: 
      Manage user-related page interactions for the test suite.

    Description: 
      Encapsulates actions and data models required to create, search, and validate user records on the user management page.
 
      **/

export interface UserDetails {
  userRole: string;
  employeeName: string;
  status: string;
  username: string;
  password?: string;
  confirmPassword?: string;
}

export class UserManagementPage {
  readonly page: Page;
  readonly _commonPages: CommonPage;

  constructor(page: Page) {
    this.page = page;
    this._commonPages = new CommonPage(this.page);
  }

  async navigateToUsers() {
    await this._commonPages.clickOn_button(`${app.pageLayout.ADMIN_MENU_LINK}`);
    await expect(
      this.page.locator(`${app.pageLayout.SYSTEM_USERS_HEADER}`),
    ).toBeVisible({ timeout: 20000 });
  }

  async addUser(details: UserDetails) {
    await this._commonPages.clickOn_button(`${app.buttons.ADD_USER}`);
    await expect(
      this.page.locator(`${app.pageLayout.ADD_USER_HEADER}`),
    ).toBeVisible();

    await this._commonPages.selectDropdownOption(
      `${app.inputLayout.FORM_DROPDOWN_TRIGGERS}`,
      0,
      details.userRole,
      `${app.pageLayout.DROPDOWN_OPTION}`,
    );

    await this._commonPages.selectAutocompleteOption(
      `${app.inputLayout.EMPLOYEE_NAME_AUTOCOMPLETE}`,
      details.employeeName,
      `${app.pageLayout.AUTOCOMPLETE_OPTION}`,
    );

    await this._commonPages.selectDropdownOption(
      `${app.inputLayout.FORM_DROPDOWN_TRIGGERS}`,
      1,
      details.status,
      `${app.pageLayout.DROPDOWN_OPTION}`,
    );

    const usernameInput = this.page.getByRole("textbox").nth(2);
    await expect(usernameInput).toBeVisible({ timeout: 10000 });
    await usernameInput.fill(details.username);

    if (details.password) {
      await this.page
        .locator(`${app.inputLayout.FORM_PASSWORD_INPUTS}`)
        .nth(0)
        .fill(details.password);
    }
    if (details.confirmPassword) {
      await this.page
        .locator(`${app.inputLayout.FORM_PASSWORD_INPUTS}`)
        .nth(1)
        .fill(details.confirmPassword);
    }

    await this._commonPages.clickOn_button(`${app.buttons.SAVE}`);
  }

  async searchByUsername(username: string) {
    const searchInput = this.page.getByRole("textbox").nth(1);
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    await searchInput.fill(username);
    await this._commonPages.clickOn_button(`${app.buttons.SEARCH}`);
    await this.page.waitForLoadState("networkidle");
  }

  getRowByUsername(username: string): Locator {
    return this.page
      .locator(`${app.pageLayout.TABLE_ROW}`)
      .filter({ has: this.page.getByText(username, { exact: true }) });
  }

  async isUserPresent(username: string): Promise<boolean> {
    const row = this.getRowByUsername(username);
    return await row.first().isVisible();
  }

  async openEditUser(username: string) {
    const row = this.getRowByUsername(username).first();
    await expect(row).toBeVisible({ timeout: 10000 });
    await row.locator(`${app.pageLayout.ROW_ACTION_BUTTONS}`).first().click();
    await expect(
      this.page.locator(`${app.pageLayout.EDIT_USER_HEADER}`),
    ).toBeVisible();
  }

  async editUser(details: UserDetails) {
    await this._commonPages.selectDropdownOption(
      `${app.inputLayout.FORM_DROPDOWN_TRIGGERS}`,
      0,
      details.userRole,
      `${app.pageLayout.DROPDOWN_OPTION}`,
    );

    await this._commonPages.selectAutocompleteOption(
      `${app.inputLayout.EMPLOYEE_NAME_AUTOCOMPLETE}`,
      details.employeeName,
      `${app.pageLayout.AUTOCOMPLETE_OPTION}`,
    );

    await this._commonPages.selectDropdownOption(
      `${app.inputLayout.FORM_DROPDOWN_TRIGGERS}`,
      1,
      details.status,
      `${app.pageLayout.DROPDOWN_OPTION}`,
    );

    const usernameInput = this.page.getByRole("textbox").nth(2);
    await expect(usernameInput).toBeVisible({ timeout: 10000 });
    await usernameInput.fill(details.username);

    await this._commonPages.clickOn_button(`${app.buttons.SAVE}`);
  }

  async deleteUser(username: string) {
    const row = this.getRowByUsername(username);
    await expect(row).toBeVisible({ timeout: 10000 });

    const rowActionButtons = row.locator(
      `${app.pageLayout.ROW_ACTION_BUTTONS}`,
    );
    const rowActionCount = await rowActionButtons.count();

    if (rowActionCount >= 2) {
      await rowActionButtons.nth(1).click();
    } else {
      await row.locator(`${app.pageLayout.ROW_CHECKBOX}`).first().click();
      await this._commonPages.clickOn_button(`${app.buttons.DELETE_SELECTED}`);
    }

    await expect(
      this.page.locator(`${app.pageLayout.DELETE_CONFIRM_DIALOG}`),
    ).toBeVisible();
    await this._commonPages.clickOn_button(`${app.buttons.YES_DELETE}`);
  }

  async expectToastToContain(text: string) {
    await this._commonPages.waitForToastContaining(
      text,
      `${app.pageLayout.TOAST}`,
    );
  }
}
