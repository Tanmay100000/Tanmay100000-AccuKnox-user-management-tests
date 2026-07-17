import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './specs',
  fullyParallel: false,
  workers: 1,
  timeout: 60000,
  use: {
    headless: true,
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    screenshot: 'on',
    video: 'on',
    trace: 'on-first-retry',
  },
  reporter: [["line"], ["allure-playwright"]],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
