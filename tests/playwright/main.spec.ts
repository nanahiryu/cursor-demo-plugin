import test, { expect } from "@playwright/test";

import { setupPluginConfig } from "./utils/api";
import { loginAdmin } from "./utils/auth";
import { navigateToUrl } from "./utils/shared";

test.beforeEach(async ({ page }) => {
  await loginAdmin(page);
});

test.describe("一覧画面テスト", () => {
  const baseUrl = process.env.BASE_URL;
  const customerAppId = process.env.CUSTOMER_APP_ID;
  const pluginId = process.env.PLUGIN_ID;

  if (!baseUrl || !customerAppId || !pluginId) {
    throw new Error("必要な環境変数が設定されていません");
  }

  const indexPageUrl = `https://${baseUrl}/k/${customerAppId}/`;
  const pluginConfigUrl = `https://${baseUrl}/k/admin/app/${customerAppId}/plugin/config?pluginId=${pluginId}`;

  // 各テストの前に実行する事前準備
  test.beforeEach(async ({ page }) => {
    // プラグイン設定をセットアップ
    await setupPluginConfig(
      page,
      {
        highColor: "#000000", // 勤続年数5年以上のカラーコード（黒色）
        lowColor: "#FFFFFF", // 勤続年数5年未満のカラーコード（白色）
      },
      pluginConfigUrl,
      indexPageUrl,
    );
  });

  test("6. 色分け表示と設定変更後の反映確認", async ({ page }) => {
    // 一覧画面を表示
    await navigateToUrl(page, indexPageUrl);

    // 勤続年数が5年以上のユーザーの背景色が"#000000"（黒色）になっていることを確認
    const highYearsElements = await page
      .locator("td.recordlist-cell-gaia.recordlist-single_line_text-gaia.value-15925950")
      .filter({
        has: page.locator("div.line-cell-gaia span").filter({
          hasText: /^([5-9]|[1-9]\d+)$/,
        }),
      });

    // 最初の5年以上のセルの背景色を確認
    await expect(highYearsElements.first()).toHaveCSS("background-color", "rgb(0, 0, 0)");

    // 勤続年数が5年未満のユーザーの背景色が"#FFFFFF"（白色）になっていることを確認
    const lowYearsElements = await page
      .locator("td.recordlist-cell-gaia.recordlist-single_line_text-gaia.value-15925950")
      .filter({
        has: page.locator("div.line-cell-gaia span").filter({
          hasText: /^[1-4]$/,
        }),
      });

    // 最初の5年未満のセルの背景色を確認
    await expect(lowYearsElements.first()).toHaveCSS("background-color", "rgb(255, 255, 255)");

    // 設定画面に戻る
    await navigateToUrl(page, pluginConfigUrl);

    // "勤続年数5年以上"のカラーコードを"#0000FF"（青色）に変更
    await page.locator(".colorPicker__channelInput").first().fill("#0000FF");

    // "勤続年数5年未満"のカラーコードを"#FFFF00"（黄色）に変更
    await page.locator(".colorPicker__channelInput").nth(1).fill("#FFFF00");

    // 設定を保存
    await page.getByText("保存").click();
    await page.getByText("アプリの設定に戻る").click();
    await page.locator("button").filter({ hasText: "アプリを更新" }).click();
    await page
      .getByRole("dialog")
      .locator("button")
      .filter({
        hasText: "アプリを更新",
      })
      .click();
    await page.waitForURL(indexPageUrl);

    // 一覧画面に戻る
    await navigateToUrl(page, indexPageUrl);

    // 勤続年数が5年以上のユーザーの背景色が"#0000FF"（青色）に更新されていることを確認
    await expect(highYearsElements.first()).toHaveCSS("background-color", "rgb(0, 0, 255)");

    // 勤続年数が5年未満のユーザーの背景色が"#FFFF00"（黄色）に更新されていることを確認
    await expect(lowYearsElements.first()).toHaveCSS("background-color", "rgb(255, 255, 0)");
  });
});
