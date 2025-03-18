import { Page } from "@playwright/test";

export const navigateToUrl = async (page: Page, url: string) => {
  await page.goto(url);
  await page.waitForURL(url);
};
