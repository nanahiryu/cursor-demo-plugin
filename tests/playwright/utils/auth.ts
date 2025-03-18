import { Page } from "@playwright/test";

// adminでログインする
export const loginAdmin = async (page: Page) => {
  const baseUrl = process.env.BASE_URL;
  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;
  if (!baseUrl || !username || !password) {
    throw new Error("BASE_URL, USERNAME, PASSWORD is not defined");
  }
  await login(page, username, password);
};

// ログインする
const login = async (page: Page, username: string, password: string) => {
  const baseUrl = process.env.BASE_URL;
  if (!baseUrl) {
    throw new Error("BASE_URL is not defined");
  }
  await page.goto(`https://${baseUrl}/k/`);
  await page.getByPlaceholder(/Login Name|ログイン名/).fill(username);
  await page.getByPlaceholder(/Password|パスワード/).fill(password);
  await page.getByRole("button", { name: /Login|ログイン/ }).click();
  await page.getByText("ポータル").waitFor({ state: "visible", timeout: 10000 });
};
