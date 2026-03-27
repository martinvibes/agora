import { test, expect } from "@playwright/test";
import fs from "fs";

test.beforeAll(() => {
  fs.mkdirSync("tests/screenshots", { recursive: true });
});

test("populated state", async ({ page }) => {
  await page.goto("/profile");
  await expect(page.locator('[data-testid="hosted-events-list"]')).toBeVisible();
  await expect(page.locator('[data-testid="attended-events-list"]')).toBeVisible();
  await page.screenshot({ path: "tests/screenshots/populated-state.png", fullPage: true });
});

test("empty state", async ({ page }) => {
  await page.goto("/profile?empty=1");
  await expect(page.locator('[data-testid="hosted-empty-state"]')).toBeVisible();
  await expect(page.locator('[data-testid="attended-empty-state"]')).toBeVisible();
  await expect(page.getByRole("link", { name: "Explore Events" }).first()).toBeVisible();
  await page.screenshot({ path: "tests/screenshots/empty-state.png", fullPage: true });
});
