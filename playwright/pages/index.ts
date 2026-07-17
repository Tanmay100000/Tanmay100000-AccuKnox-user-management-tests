import { Page } from "@playwright/test";
import { LoginPage } from "./loginPage";
import { CommonPage } from "./commonPage";
import { UserManagementPage } from "./userManagementPage";

/**
    Author: Tanmay Wadibhasme.

    Date: 17/07/2026
    
    Purpose: 
      Aggregate page objects for the application test suite.
    
    Description: 
      Provides centralized access to LoginPage, CommonPage, and UserManagementPage instances for reusable test flows.

**/

export class Pages {
  _loginPage: LoginPage;
  _common: CommonPage;
  _userManagementPage: UserManagementPage;

  constructor(page: Page) {
    this._loginPage = new LoginPage(page);
    this._common = new CommonPage(page);
    this._userManagementPage = new UserManagementPage(page);
  }
}
