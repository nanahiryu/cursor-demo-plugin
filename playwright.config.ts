import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

if (process.env.TEST_ENV) {
  dotenv.config({
    path: `.env.${process.env.TEST_ENV}`,
    override: true,
  });
} else {
  // テスト環境が指定されていない場合は、エラーを発生し終了
  throw new Error("TEST_ENV is not defined");
}

export default defineConfig({
  testDir: "./tests/playwright",
  fullyParallel: false,
  retries: 2,
  workers: 1,
  reporter: [["html"], ["line"]],
  use: {
    trace: "on",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
