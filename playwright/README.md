# AccuKnox User Management Tests — OrangeHRM (Playwright + TypeScript)

E2E automation for the **Admin > User Management** module of the
[OrangeHRM demo application](https://opensource-demo.orangehrmlive.com/web/index.php/auth/login),
built with [Playwright](https://playwright.dev/).

## Project structure

```
playwright/
├── locators/
│   ├── webLocators.ts       # every raw selector, grouped into enums (inputLayout, buttons, pageLayout)
│   └── index.ts              # re-exports the locators as `app`
├── pages/
│   ├── commonPage.ts         # generic reusable actions (fill, click, select dropdown, autocomplete, toast wait...)
│   ├── loginPage.ts          # Login screen actions
│   ├── userManagementPage.ts # Admin > Users screen actions (add/search/edit/delete)
│   ├── fixtures.ts           # custom worker-scoped Playwright fixture (shared browser page across specs)
│   └── index.ts              # aggregates all page objects into one `Pages` class
├── data/
│   ├── login.json            # Admin credentials
│   ├── newUser.json          # data for the Add User scenario
│   ├── editUser.json         # data for the Edit User scenario
│   └── messages.json         # expected toast/validation text
├── specs/
│   ├── 001_login.spec.ts           # TC_UM_01
│   └── 002_userManagement.spec.ts  # TC_UM_02 through TC_UM_10
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md
```



## Test case coverage

| Test ID | Scenario | Spec file |
|---|---|---|
| TC_UM_01 | Admin login with valid credentials | `specs/001_login.spec.ts` |
| TC_UM_02 | Navigate to Admin > User Management | `specs/002_userManagement.spec.ts` |
| TC_UM_03 | Add a new user | `specs/002_userManagement.spec.ts` |
| TC_UM_04 | Password / Confirm Password mismatch validation | `specs/002_userManagement.spec.ts` |
| TC_UM_05 | Search newly created user | `specs/002_userManagement.spec.ts` |
| TC_UM_06 | Edit all editable user details | `specs/002_userManagement.spec.ts` |
| TC_UM_07 | Validate updated details | `specs/002_userManagement.spec.ts` |
| TC_UM_08 | Delete the user | `specs/002_userManagement.spec.ts` |
| TC_UM_09 | Verify deleted user is gone | `specs/002_userManagement.spec.ts` |
| TC_UM_10 | Duplicate username validation | `specs/002_userManagement.spec.ts` |



## Prerequisites

- [Node.js](https://nodejs.org/) 18 LTS or newer
- npm 9+

## Playwright version

`@playwright/test ^1.61.1` (see `package.json`).

## Setup

```bash
cd playwright
npm install
npx playwright install --with-deps chromium
npm run test:ui

```

## Running the tests

```bash

npm run test:ui       # interactive UI mode — best for debugging locators

```


