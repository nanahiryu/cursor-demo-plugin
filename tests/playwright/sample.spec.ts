import test, { expect } from "@playwright/test";

import { loginAdmin } from "./utils/auth";
import { navigateToUrl } from "./utils/main";

test.beforeEach(async ({ page }) => {
  await loginAdmin(page);
});

test.describe("サンプルテスト", () => {
  const baseUrl = process.env.BASE_URL;

  if (!baseUrl) {
    throw new Error("failed loading environment variables");
  }

  const customerAppId = process.env.CUSTOMER_APP_ID;
  if (!customerAppId) {
    throw new Error("failed loading environment variables");
  }

  const indexPageUrl = `https://${baseUrl}/k/${customerAppId}/`;

  test("顧客管理アプリが開ける", async ({ page }) => {
    await navigateToUrl(page, indexPageUrl);

    // 一般ユーザの表示名が表示されていることを確認
    await expect(page.getByText("顧客管理アプリ").first()).toBeVisible();
  });
});
