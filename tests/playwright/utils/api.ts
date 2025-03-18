import { Page } from "@playwright/test";

import { saveConfig } from "./config";
import { PARAMS_FOR_PLAYWRIGHT } from "./params";
import { navigateToUrl } from "./shared";

import { PluginConfig, PluginConfigParam } from "@/types/type";

// JSAPIを利用して保存されているプラグイン設定を取得する
// レコード一覧、詳細、プラグイン設定画面などで利用可能
export const getPluginConfigJSAPI = async (page: Page) => {
  const config = await page.evaluate(() => {
    const pluginId = kintone.$PLUGIN_ID;
    return kintone.plugin.app.getConfig(pluginId);
  });
  return config;
};

// JSAPIを利用してプラグイン設定をセットアップする
export const setPluginConfigJSAPI = async (page: Page, pluginConfig: PluginConfig) => {
  const stringifiedConfig = {
    param: JSON.stringify(pluginConfig.param),
    version: JSON.stringify(pluginConfig.version),
  };
  await page.evaluate((_config) => {
    kintone.plugin.app.setConfig(_config);
  }, stringifiedConfig);
};

// プラグイン設定をセットアップする
export const setupPluginConfig = async (
  page: Page,
  pluginConfigParam: PluginConfigParam,
  pluginConfigLink: string,
  indexPageUrl: string,
) => {
  const config = {
    param: pluginConfigParam,
    version: "1.0.0",
  };

  await navigateToUrl(page, pluginConfigLink);
  await setPluginConfigJSAPI(page, config);
  await page.getByText(PARAMS_FOR_PLAYWRIGHT.pluginConfig.backToAppSetting).click();
  await saveConfig(page, indexPageUrl);
};
