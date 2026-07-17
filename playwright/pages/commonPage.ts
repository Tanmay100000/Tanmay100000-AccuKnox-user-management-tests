import { Page, Locator, expect } from "@playwright/test";

/**
    Author: Tanmay Wadibhasme

    Date: 17/07/2026
    
    Purpose:  
      Shared Playwright page object helpers for common UI actions.

    Description: 
      Reusable methods for filling fields, clicking buttons, selecting dropdown and autocomplete options, locating table rows, and waiting for toast notifications.
   
    */

export class CommonPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /*  Auther: 
    Date 
    Use : 
    Description */

  async enterRecord(locator: string, value: string) {
    await this.page.locator(locator).fill(value);
  }

  async enterRecordByPlaceHolder(placeholder: string, value: string) {
    await this.page.getByPlaceholder(placeholder).fill(value);
  }

  async clickOn_button(locator: string) {
    await this.page.locator(locator).click();
  }

  async performClick_byRole(roles: any, name: string) {
    await this.page.getByRole(roles, { name, exact: true }).click();
  }

  async selectDropdownOption(
    triggerLocator: string,
    index: number,
    optionText: string,
    dropdownOptionLocator: string,
  ) {
    await this.page.locator(triggerLocator).nth(index).click();
    const option = this.page
      .locator(dropdownOptionLocator)
      .filter({ hasText: optionText });
    await option.first().click();
  }

  async selectAutocompleteOption(
    inputLocator: string,
    value: string,
    optionLocator: string,
  ) {
    const input = this.page.locator(inputLocator);
    await input.click();
    await input.fill(value);
    const option = this.page.locator(optionLocator).filter({ hasText: value });
    await expect(option.first()).toBeVisible({ timeout: 10000 });
    await option.first().click();
  }

  getRowByText(rowLocator: string, text: string): Locator {
    return this.page.locator(rowLocator).filter({ hasText: text });
  }

  async waitForToastContaining(
    expectedText: string,
    toastLocator: string,
    timeout = 10000,
  ) {
    await expect(this.page.locator(toastLocator)).toContainText(expectedText, {
      timeout,
    });
  }
}
