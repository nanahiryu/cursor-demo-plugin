import { Page } from "@playwright/test";

import { PARAMS_FOR_PLAYWRIGHT } from "./params";

import { PluginConfigParam } from "@/types/type";

// プラグイン設定画面で利用可能
// 設定したプラグイン設定を保存する
// 使用後、一覧画面に遷移する
export const savePluginConfig = async (page: Page, indexPageUrl: string) => {
  await page.getByText(PARAMS_FOR_PLAYWRIGHT.pluginConfig.confirmButton).click();
  await page.getByText(PARAMS_FOR_PLAYWRIGHT.pluginConfig.backToAppSetting).click();
  await saveConfig(page, indexPageUrl);
};

// アプリ設定画面で利用可能
// 設定したアプリ設定を保存する
// 使用後、一覧画面に遷移する
export const saveConfig = async (page: Page, indexPageUrl: string) => {
  await page.locator("button").filter({ hasText: PARAMS_FOR_PLAYWRIGHT.config.updateAppButton }).click();
  await page
    .getByRole("dialog")
    .locator("button")
    .filter({
      hasText: PARAMS_FOR_PLAYWRIGHT.configConfirmDialog.updateAppButton,
    })
    .click();
  // await page.getByTitle(PARAMS_FOR_PLAYWRIGHT.recordIndex.configButtonTitle).isVisible();
  await page.waitForURL(indexPageUrl);
};

// プラグイン設定をリセットする
export const resetPluginConfig = async (page: Page, pluginConfigLink: string, indexPageUrl: string) => {
  const config = {
    param: {
      highColor: "#000000",
      lowColor: "#ffffff",
    } satisfies PluginConfigParam,
    version: "1.0.0",
  };
  const stringifiedConfig = {
    param: JSON.stringify(config.param),
    version: JSON.stringify(config.version),
  };

  await page.goto(pluginConfigLink);
  await page.evaluate((_config) => {
    kintone.plugin.app.setConfig(_config);
  }, stringifiedConfig);
  await page.getByText(PARAMS_FOR_PLAYWRIGHT.pluginConfig.backToAppSetting).click();
  await saveConfig(page, indexPageUrl);
};
