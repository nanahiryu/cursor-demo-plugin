import test, { expect } from "@playwright/test";

import { changeUserToGeneral, loginAdmin } from "./utils/auth";

test.beforeEach(async ({ page }) => {
  await loginAdmin(page);
});

test.describe("サンプルテスト", () => {
  const baseUrl = process.env.BASE_URL;
  const generalDisplayName = process.env.GENERAL_DISPLAY_NAME;

  if (!baseUrl || !generalDisplayName) {
    throw new Error("failed loading environment variables");
  }

  test("一般ユーザへのユーザ切り替え", async ({ page }) => {
    await changeUserToGeneral(page);

    // 一般ユーザの表示名が表示されていることを確認
    await expect(page.getByText(generalDisplayName)).toBeVisible();
  });
});
