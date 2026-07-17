import { test } from "../pages/fixtures";
import { expect } from "@playwright/test";
import * as newUserData from "../data/newUser.json";
import * as editUserData from "../data/editUser.json";
import * as messages from "../data/messages.json";
import * as loginData from "../data/login.json";
import { app } from "../locators";

/**
    Author: Tanmay Wadibhasme.

    Date: 17/07/2026
    
    Purpose: 
      Verify admin user management functionality in OrangeHRM.

    Description: 
      Covers creation, editing, Delete and validation of user profiles, including toast message confirmation and dashboard navigation.
      

**/

test.describe.configure({ mode: "serial" });

test.describe("OrangeHRM - Admin User Management", () => {
  const stamp = Date.now().toString().slice(-8);
  const createdUsername = `${newUserData.USERNAME_PREFIX}`;
  const editedUsername = `${createdUsername}${editUserData.USERNAME_SUFFIX}`;

  test.beforeAll(async ({ pages }) => {
    await pages._loginPage.loginAsAdmin(loginData.USERNAME, loginData.PASSWORD);
  });

  test("TC_UM_02 - Admin can navigate to User Management > Users screen", async ({
    sharedPage,
    pages,
  }) => {
    await test.step("Open Admin module", async () => {
      await pages._userManagementPage.navigateToUsers();
    });

    await test.step("Verify Users screen is displayed", async () => {
      await expect(
        sharedPage.locator(`${app.pageLayout.SYSTEM_USERS_HEADER}`),
      ).toBeVisible();
    });
  });

  test("TC_UM_03 - Admin can add a new user with valid details", async ({
    pages,
  }) => {
    await pages._userManagementPage.navigateToUsers();

    await test.step("Fill and submit the Add User form", async () => {
      await pages._userManagementPage.addUser({
        userRole: newUserData.USER_ROLE,
        employeeName: newUserData.EMPLOYEE_NAME,
        status: newUserData.STATUS,
        username: createdUsername,
        password: newUserData.PASSWORD,
        confirmPassword: newUserData.CONFIRM_PASSWORD,
      });
    });

    await test.step("Verify success toast", async () => {
      await pages._userManagementPage.expectToastToContain(messages.USER_SAVED);
    });
  });

  test("TC_UM_04 - Adding a user with mismatched Password/Confirm Password shows a validation error", async ({
    sharedPage,
    pages,
  }) => {
    await pages._userManagementPage.navigateToUsers();

    const throwawayUsername = `mismatch_check_${stamp}`;

    await test.step("Fill Add User form with mismatched passwords", async () => {
      await pages._userManagementPage.addUser({
        userRole: newUserData.USER_ROLE,
        employeeName: newUserData.EMPLOYEE_NAME,
        status: newUserData.STATUS,
        username: throwawayUsername,
        password: newUserData.PASSWORD,
        confirmPassword: newUserData.MISMATCHED_CONFIRM_PASSWORD,
      });
    });

    await test.step("Verify validation error and no user created", async () => {
      await expect(
        sharedPage.locator(`${app.pageLayout.PASSWORD_MISMATCH_ERROR}`),
      ).toBeVisible();
      await pages._common.clickOn_button(`${app.buttons.CANCEL}`);
      await pages._userManagementPage.searchByUsername(throwawayUsername);
      expect(
        await pages._userManagementPage.isUserPresent(throwawayUsername),
      ).toBeFalsy();
    });
  });

  test("TC_UM_05 - Newly created user can be found via search", async ({
    pages,
  }) => {
    await pages._userManagementPage.navigateToUsers();
    await test.step("Search by username", async () => {
      await pages._userManagementPage.searchByUsername(createdUsername);
    });

    await test.step("Verify user appears in results", async () => {
      expect(
        await pages._userManagementPage.isUserPresent(createdUsername),
      ).toBeTruthy();
    });
  });

  test("TC_UM_06 - Admin can edit all editable details of the user", async ({
    pages,
  }) => {
    await pages._userManagementPage.navigateToUsers();
    await test.step("Open edit form for the user", async () => {
      await pages._userManagementPage.openEditUser(createdUsername);
    });

    await test.step("Update role, status and username, then save", async () => {
      await pages._userManagementPage.editUser({
        userRole: editUserData.USER_ROLE,
        employeeName: editUserData.EMPLOYEE_NAME,
        status: editUserData.STATUS,
        username: editedUsername,
      });
    });

    await test.step("Verify success toast", async () => {
      await pages._userManagementPage.expectToastToContain(
        messages.USER_UPDATED,
      );
    });
  });

  test("TC_UM_07 - Updated user details are reflected correctly", async ({
    pages,
  }) => {
    await pages._userManagementPage.navigateToUsers();
    await test.step("Search for the edited username", async () => {
      await pages._userManagementPage.searchByUsername(editedUsername);
    });

    await test.step("Verify row shows updated role/status/username", async () => {
      const row = pages._userManagementPage.getRowByUsername(editedUsername);
      await expect(row).toBeVisible();
      await expect(row).toContainText(editedUsername);
      await expect(row).toContainText(editUserData.USER_ROLE);
      await expect(row).toContainText(editUserData.STATUS);
    });
  });

  test("TC_UM_08 - Admin can delete the user", async ({ pages }) => {
    await pages._userManagementPage.navigateToUsers();
    await test.step("Search for the user", async () => {
      await pages._userManagementPage.searchByUsername(editedUsername);
    });

    await test.step("Delete the user and confirm", async () => {
      await pages._userManagementPage.deleteUser(editedUsername);
    });

    await test.step("Verify success toast", async () => {
      await pages._userManagementPage.expectToastToContain(
        messages.USER_DELETED,
      );
    });
  });

  test("TC_UM_09 - Deleted user no longer appears in search results", async ({
    sharedPage,
    pages,
  }) => {
    await pages._userManagementPage.navigateToUsers();
    await test.step("Search for the deleted username", async () => {
      await pages._userManagementPage.searchByUsername(editedUsername);
    });

    await test.step("Verify no records found", async () => {
      expect(
        await pages._userManagementPage.isUserPresent(editedUsername),
      ).toBeFalsy();
      await expect(
        sharedPage.locator(`${app.pageLayout.NO_RECORDS}`),
      ).toBeVisible();
    });
  });

  test("TC_UM_10 - Adding a user with a duplicate username shows a validation error", async ({
    sharedPage,
    pages,
  }) => {
    await test.step("Attempt to add a user with the existing Admin username", async () => {
      await pages._userManagementPage.navigateToUsers();
      await pages._userManagementPage.addUser({
        userRole: newUserData.USER_ROLE,
        employeeName: newUserData.EMPLOYEE_NAME,
        status: newUserData.STATUS,
        username: loginData.USERNAME, // 'Admin' already exists
      });
    });

    await test.step("Verify duplicate-username validation error", async () => {
      await expect(
        sharedPage.locator(`${app.pageLayout.ALREADY_EXISTS_ERROR}`),
      ).toBeVisible();
    });
  });
});
