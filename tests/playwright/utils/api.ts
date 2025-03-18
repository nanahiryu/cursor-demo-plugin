import { Page } from "@playwright/test";

import { saveConfig } from "./config";
import { PARAMS_FOR_PLAYWRIGHT } from "./params";
import { navigateToUrl } from "./shared";

import { PluginConfigParam, PluginConfigUnParsed } from "@/types/type";

// 保存されているプラグイン設定を取得する
// レコード一覧、詳細、プラグイン設定画面などで利用可能
export const getPluginConfigJSAPI = async (page: Page) => {
  const config = await page.evaluate(() => {
    const pluginId = kintone.$PLUGIN_ID;
    return kintone.plugin.app.getConfig(pluginId);
  });
  return config;
};

export const setPluginConfigJSAPI = async (page: Page, stringifiedConfig: PluginConfigUnParsed) => {
  await page.evaluate((_config) => {
    kintone.plugin.app.setConfig(_config);
  }, stringifiedConfig);
};

// プラグイン設定をセットアップする
export const setupPluginConfig = async (page: Page, pluginConfigLink: string, indexPageUrl: string) => {
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

  await navigateToUrl(page, pluginConfigLink);
  await setPluginConfigJSAPI(page, stringifiedConfig);
  await page.getByText(PARAMS_FOR_PLAYWRIGHT.pluginConfig.backToAppSetting).click();
  await saveConfig(page, indexPageUrl);
};
