import { Page } from "@playwright/test";

import { PARAMS_FOR_PLAYWRIGHT } from "./params";

export const savePluginConfig = async (page: Page) => {
  await page
    .getByText(PARAMS_FOR_PLAYWRIGHT.pluginConfig.confirmButton)
    .click();
  await page
    .getByText(PARAMS_FOR_PLAYWRIGHT.pluginConfig.backToAppSetting)
    .click();
  await saveConfig(page);
};

export const saveConfig = async (page: Page) => {
  await page
    .locator("button")
    .filter({ hasText: PARAMS_FOR_PLAYWRIGHT.config.updateAppButton })
    .click();
  await page
    .getByRole("dialog")
    .locator("button")
    .filter({
      hasText: PARAMS_FOR_PLAYWRIGHT.configConfirmDialog.updateAppButton,
    })
    .click();
  await page
    .getByTitle(PARAMS_FOR_PLAYWRIGHT.recordIndex.configButtonTitle)
    .isVisible();
};
