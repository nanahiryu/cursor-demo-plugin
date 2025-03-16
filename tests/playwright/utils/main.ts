import { Locator, Page } from "@playwright/test";

import { PARAMS_FOR_PLAYWRIGHT } from "./params";

export const getTextContent = async (page: Page, selector: string) => {
  const textContent = await page.locator(selector).textContent();
  if (!textContent) {
    throw new Error(`${selector} is not found`);
  }
  return textContent;
};

export const getElement = async (page: Page, selector: string) => {
  const element = await page.locator(selector);
  if (!element) {
    throw new Error(`element is not found`);
  }
  return element;
};

// 上からindex番目のtr要素を取得する
export const getNthTableRow = async (page: Page, index: number) => {
  const selector = `#view-list-data-gaia > table > tbody > tr:nth-child(${index})`;

  const element = await getElement(page, selector);
  if (!element) {
    throw new Error(`element is not found. selector: ${selector} `);
  }
  return element;
};

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
