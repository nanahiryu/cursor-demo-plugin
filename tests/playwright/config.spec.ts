import test, { expect } from "@playwright/test";

import { loginAdmin } from "./utils/auth";
import { savePluginConfig } from "./utils/config";
import { navigateToUrl } from "./utils/shared";

test.beforeEach(async ({ page }) => {
  await loginAdmin(page);
});

test.describe("設定画面テスト", () => {
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
    // 設定画面を開く
    await navigateToUrl(page, pluginConfigUrl);

    // 初期値の設定
    // "勤続年数5年以上"のカラーコードに"#000000"（黒色）を設定
    await page.locator(".colorPicker__channelInput").first().fill("#000000");

    // "勤続年数5年未満"のカラーコードに"#FFFFFF"（白色）を設定
    await page.locator(".colorPicker__channelInput").nth(1).fill("#FFFFFF");

    // 設定を保存
    await savePluginConfig(page, indexPageUrl);

    // 再度設定画面を開く
    await navigateToUrl(page, pluginConfigUrl);
  });

  test("1. カラーコードの正常入力確認", async ({ page }) => {
    // "勤続年数5年以上"の入力フィールドに"#FF0000"（赤色）を入力
    await page.locator(".colorPicker__channelInput").first().fill("#FF0000");

    // "勤続年数5年未満"の入力フィールドに"#0000FF"（青色）を入力
    await page.locator(".colorPicker__channelInput").nth(1).fill("#0000FF");

    // 設定を保存
    await savePluginConfig(page, indexPageUrl);

    // 再度設定画面を開く
    await navigateToUrl(page, pluginConfigUrl);

    // "勤続年数5年以上"のカラーコードが"#FF0000"に設定されていることを確認
    await expect(page.locator(".colorPicker__channelInput").first()).toHaveValue("#FF0000");

    // "勤続年数5年未満"のカラーコードが"#0000FF"に設定されていることを確認
    await expect(page.locator(".colorPicker__channelInput").nth(1)).toHaveValue("#0000FF");
  });

  test("2. 無効なカラーコードの入力制限", async ({ page }) => {
    // "勤続年数5年以上"の入力フィールドに無効なカラーコード"#XYZ"を入力
    await page.locator(".colorPicker__channelInput").first().fill("#XYZ");

    // "勤続年数5年未満"の入力フィールドに無効なカラーコード"*123"を入力
    await page.locator(".colorPicker__channelInput").nth(1).fill("*123");

    // 別の場所をクリック
    await page.locator("h2.chakra-heading").click();

    // "勤続年数5年以上"のカラーコードが事前に設定した"#000000"のままであることを確認
    await expect(page.locator(".colorPicker__channelInput").first()).toHaveValue("#000000");

    // "勤続年数5年未満"のカラーコードが事前に設定した"#FFFFFF"のままであることを確認
    await expect(page.locator(".colorPicker__channelInput").nth(1)).toHaveValue("#FFFFFF");
  });

  test("3. 空値の入力制限", async ({ page }) => {
    // "勤続年数5年以上"の入力フィールドを空にする
    await page.locator(".colorPicker__channelInput").first().fill("");

    // "勤続年数5年未満"の入力フィールドを空にする
    await page.locator(".colorPicker__channelInput").nth(1).fill("");

    // 別の場所をクリック
    await page.locator("h2.chakra-heading").click();

    // "勤続年数5年以上"のカラーコードが事前に設定した"#000000"のままであることを確認
    await expect(page.locator(".colorPicker__channelInput").first()).toHaveValue("#000000");

    // "勤続年数5年未満"のカラーコードが事前に設定した"#FFFFFF"のままであることを確認
    await expect(page.locator(".colorPicker__channelInput").nth(1)).toHaveValue("#FFFFFF");
  });

  test("4. 有効なカラーコードの手動入力", async ({ page }) => {
    // "勤続年数5年以上"の入力フィールドに有効なカラーコード"#FF0000"（赤色）を入力
    await page.locator(".colorPicker__channelInput").first().fill("#FF0000");

    // "勤続年数5年未満"の入力フィールドに有効なカラーコード"#00FF00"（緑色）を入力
    await page.locator(".colorPicker__channelInput").nth(1).fill("#00FF00");

    // 設定を保存
    await savePluginConfig(page, indexPageUrl);

    // 再度設定画面を開く
    await navigateToUrl(page, pluginConfigUrl);

    // "勤続年数5年以上"のカラーコードが"#FF0000"に設定されていることを確認
    await expect(page.locator(".colorPicker__channelInput").first()).toHaveValue("#FF0000");

    // "勤続年数5年未満"のカラーコードが"#00FF00"に設定されていることを確認
    await expect(page.locator(".colorPicker__channelInput").nth(1)).toHaveValue("#00FF00");
  });

  test("5. 初期値の確認", async ({ page }) => {
    // "勤続年数5年以上"のカラーコードを"#FF0000"（赤色）に設定
    await page.locator(".colorPicker__channelInput").first().fill("#FF0000");

    // "勤続年数5年未満"のカラーコードを"#00FF00"（緑色）に設定
    await page.locator(".colorPicker__channelInput").nth(1).fill("#00FF00");

    // 設定を保存
    await savePluginConfig(page, indexPageUrl);

    // 再度設定画面を開く
    await navigateToUrl(page, pluginConfigUrl);

    // "勤続年数5年以上"のカラーコード"#FF0000"が初期値として表示されていることを確認
    await expect(page.locator(".colorPicker__channelInput").first()).toHaveValue("#FF0000");

    // "勤続年数5年未満"のカラーコード"#00FF00"が初期値として表示されていることを確認
    await expect(page.locator(".colorPicker__channelInput").nth(1)).toHaveValue("#00FF00");
  });
});
