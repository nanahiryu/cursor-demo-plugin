import { Locator, Page } from "@playwright/test";

import { PARAMS_FOR_PLAYWRIGHT } from "./params";

export const pageAccessWaitForNavigation = async (
  page: Page,
  href: string,
  transCheckSelector?: string,
  timeout: number = PARAMS_FOR_PLAYWRIGHT.defaultTimeout,
) => {
  await page.goto(href);
  if (transCheckSelector) {
    await page.waitForSelector(transCheckSelector);
  }
  if (timeout > 0) {
    await page.waitForTimeout(timeout);
  }
};

export const clickAndWaitForNavigation = async (
  locator: Locator,
  page: Page,
  transCheckSelector?: string,
  timeout: number = PARAMS_FOR_PLAYWRIGHT.defaultTimeout,
) => {
  await locator.click();
  if (transCheckSelector) {
    await page.waitForSelector(transCheckSelector);
  }
  if (timeout > 0) {
    await page.waitForTimeout(timeout);
  }
};

export const navigateToUrl = async (page: Page, url: string) => {
  await page.goto(url);
  await page.waitForURL(url);
};
