import { BrowserContext, Page, test as base } from "@playwright/test";
import { Pages } from ".";

/**
    Author: Tanmay Wadibhasme

    Date: 17/07/2026
    
    Purpose: 
      Define shared Playwright fixtures for browser context, pages, and reusable page object initialization.
    
      Description: 
      Creates a shared browser context with video recording, opens a new page, and initializes the `Pages` helper for test use.

*/

type TestFixtures = {};

type WorkerFixtures = {
  sharedContext: BrowserContext;
  sharedPage: Page;
  pages: Pages;
};

export const test = base.extend<TestFixtures, WorkerFixtures>({
  sharedContext: [
    async ({ browser }, use) => {
      const context = await browser.newContext({
        recordVideo: { dir: "videos/" },
      });
      await use(context);
      await context.close();
    },
    { scope: "worker" },
  ],

  sharedPage: [
    async ({ sharedContext }, use) => {
      const page = await sharedContext.newPage();
      await use(page);
    },
    { scope: "worker" },
  ],

  pages: [
    async ({ sharedPage }, use) => {
      const pages = new Pages(sharedPage);
      await sharedPage.goto("/web/index.php/auth/login", {
        waitUntil: "networkidle",
        timeout: 120000,
      });
      await use(pages);
    },
    { scope: "worker" },
  ],
});
