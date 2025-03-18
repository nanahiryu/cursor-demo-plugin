import { Page } from "@playwright/test";

// urlを指定して画面遷移する
export const navigateToUrl = async (page: Page, url: string) => {
  await page.goto(url);
  await page.waitForURL(url);
};
