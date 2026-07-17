
namespace WebLocators {
  export enum inputLayout {
    USERNAME = `[placeholder="Username"]`,
    PASSWORD = `[placeholder="Password"]`,
    EMPLOYEE_NAME_AUTOCOMPLETE = `[placeholder="Type for hints..."]`,

    FORM_TEXT_INPUTS = `.oxd-form input[type="text"]`,

    FORM_PASSWORD_INPUTS = `.oxd-form input[type="password"]`,
   
    FORM_DROPDOWN_TRIGGERS = `.oxd-form .oxd-select-text`,
    //  USERNAME_INPUT = `*:has-text("Username") input.oxd-input`,
    USERNAME_INPUT = `label:has-text("Username") >> input.oxd-input`

  }

  export enum buttons {
    LOGIN_SUBMIT = `button[type="submit"]`,
    ADD_USER = `button:has-text("Add")`,
    SAVE = `button:has-text("Save")`,
    CANCEL = `button:has-text("Cancel")`,
    SEARCH = `button:has-text("Search")`,
    RESET = `button:has-text("Reset")`,
    YES_DELETE = `button:has-text("Yes, Delete")`,
    DELETE_SELECTED = `button:has-text("Delete Selected")`,
  }

  export enum pageLayout {
    ADMIN_MENU_LINK = `a:has-text("Admin")`,
    DASHBOARD_BREADCRUMB = `.oxd-topbar-header-breadcrumb h6`,
    SYSTEM_USERS_HEADER = `h5:has-text("System Users")`,
    ADD_USER_HEADER = `h6:has-text("Add User")`,
    EDIT_USER_HEADER = `h6:has-text("Edit User")`,
    TABLE_ROW = `.oxd-table-card`,
    ROW_ACTION_BUTTONS = `.oxd-table-cell-actions > button:nth-child(2)`,
    ROW_CHECKBOX = `.oxd-table-cell input[type="checkbox"], .oxd-checkbox-wrapper`,
    TOAST = `.oxd-toast`,
    NO_RECORDS = `span.oxd-text--span:has-text("No Records Found")`,
    DELETE_CONFIRM_DIALOG = `text=×Are you Sure?The selected`,
    DROPDOWN_OPTION = `.oxd-select-dropdown .oxd-select-option`,
    AUTOCOMPLETE_OPTION = `.oxd-autocomplete-option`,
    ALREADY_EXISTS_ERROR = `text=Already exists`,
    PASSWORD_MISMATCH_ERROR = `text=Passwords do not match`,
  }
}
export default WebLocators
