import { defineConfig, devices } from "@playwright/test";

/** E2E against the production build (`npm run build` first). */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3101",
    trace: "retain-on-failure",
    // Optional local override for a preinstalled Chromium; CI installs its own browser.
    ...(process.env.PW_CHROMIUM_PATH ? { launchOptions: { executablePath: process.env.PW_CHROMIUM_PATH } } : {}),
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: "npm run start -- --port 3101",
    url: "http://localhost:3101/en",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
