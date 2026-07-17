# AccuKnox-user-management-tests

Manual + automated E2E test suite for the **User Management** module of
OrangeHRM (Admin > User Management > Users), submitted for the AccuKnox QA
assignment.

## Repo contents

```
AccuKnox-user-management-tests/
├── test-cases/
│   └── UserManagement_TestCases.xlsx   # 10 manual test cases
├── playwright/                         # Playwright + TypeScript automation
│   ├── locators/                       # selector enums (single source of truth)
│   ├── pages/                          # page objects + common actions + fixtures
│   ├── data/                           # test data as JSON
│   ├── specs/                          # test files (001_login, 002_userManagement)
│   ├── playwright.config.ts
│   ├── package.json
│   └── README.md                       # setup + run instructions for automation
├── problem-2-shell-scripts/            # Problem Statement 2: bash scripting tasks
│   ├── system_health_monitor.sh        # CPU/memory/disk/process monitoring
│   ├── app_health_checker.sh           # HTTP-based up/down checker
│   └── README.md                       # setup + run instructions for scripts
└── README.md                           # you are here
```

## Application under test

- URL: https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
- Credentials: `Admin` / `admin123`

## Manual test cases

See [`test-cases/UserManagement_TestCases.xlsx`](test-cases/UserManagement_TestCases.xlsx).
Columns: Test Case ID, Test Scenario, Pre-conditions, Test Steps, Test Data,
Expected Result, Actual Result, Status. A second sheet lists observations
about the AUT worth noting during exploratory testing (e.g. Password /
Confirm Password fields only appear on Add, not Edit).

## Automation

See [`playwright/README.md`](playwright/README.md) for full setup and run
instructions. Quick start:

```bash
cd playwright
npm install
npx playwright install --with-deps chromium
npm test
```

Playwright version: `1.47.x` (TypeScript).

## Problem Statement 2: Shell Scripting

See [`problem-2-shell-scripts/README.md`](problem-2-shell-scripts/README.md)
for full setup and run instructions. Two scripts, chosen from the list of
four options:

- `system_health_monitor.sh` - monitors CPU, memory, disk, and process
  count, alerts when thresholds are crossed
- `app_health_checker.sh` - checks if a web application is up or down based
  on HTTP status code

Quick start:
```bash
cd problem-2-shell-scripts
chmod +x system_health_monitor.sh app_health_checker.sh
./system_health_monitor.sh
./app_health_checker.sh https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
```

## How to push this to GitHub

```bash
cd AccuKnox-user-management-tests
git init
git add .
git commit -m "Add manual test cases and Playwright automation for User Management module"
git branch -M main
git remote add origin https://github.com/<your-username>/AccuKnox-user-management-tests.git
git push -u origin main
```
