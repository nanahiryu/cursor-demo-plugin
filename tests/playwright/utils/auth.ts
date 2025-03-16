import { Page } from "@playwright/test";

export const loginAdmin = async (page: Page) => {
  const baseUrl = process.env.BASE_URL;
  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;
  if (!baseUrl || !username || !password) {
    throw new Error("BASE_URL, USERNAME, PASSWORD is not defined");
  }
  await login(page, username, password);
};

export const loginGeneral = async (page: Page) => {
  const baseUrl = process.env.BASE_URL;
  const generalUsername = process.env.GENERAL_USERNAME;
  const generalPassword = process.env.GENERAL_PASSWORD;
  if (!baseUrl || !generalUsername || !generalPassword) {
    throw new Error("baseUrl, generalUsername, generalPassword is not defined");
  }
  await login(page, generalUsername, generalPassword);
};

const login = async (page: Page, username: string, password: string) => {
  const baseUrl = process.env.BASE_URL;
  if (!baseUrl) {
    throw new Error("BASE_URL is not defined");
  }
  await page.goto(`https://${baseUrl}/k/`);
  await page.getByPlaceholder(/Login Name|ログイン名/).fill(username);
  await page.getByPlaceholder(/Password|パスワード/).fill(password);
  await page.getByRole("button", { name: /Login|ログイン/ }).click();
  await page.getByText("NEWS").waitFor({ state: "visible", timeout: 10000 });
};

const logout = async (page: Page) => {
  // 画面最上部までスクロール
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });

  const dropDownButton = await page
    .getByTitle(/Account menu|アカウントメニュー/)
    .first();
  await dropDownButton.click();
  const logoutButton = page.getByRole("menuitem", {
    name: /Logout|ログアウト/,
  });
  await logoutButton.click();
  await page.getByText("サイボウズ株式会社").waitFor({ state: "visible" });
};

export const changeUserToAdmin = async (page: Page) => {
  await logout(page);
  await loginAdmin(page);
};

export const changeUserToGeneral = async (page: Page) => {
  await logout(page);
  await loginGeneral(page);
};
