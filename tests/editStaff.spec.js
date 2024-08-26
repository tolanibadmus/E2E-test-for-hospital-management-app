const { test, expect } = require("@playwright/test");

test("should be able to edit staff", async ({ page }) => {
  await page.goto("https://hospital-record-portal.onrender.com/login");
  await page
    .locator("xpath=//input[@name='email']")
    .fill("kaobadmus@gmail.com");
  await page.locator("xpath=//input[@name='password']").fill("kao0000");
  await page.getByRole("button", { name: "Log Into Your Account" }).click();

  await page.getByRole("link", { name: "Staff" }).click();
  await expect(page.locator(".title-wrapper")).toContainText("All Staff");

  const editRow = await page.getByRole("row").nth(1);
  await editRow.locator(".anchor-link").click();

  await page.isVisible(`text=kaobadmus@gmail.com`);

  await page.fill("//input[@name='firstName']", "Kaosarat");

  await page.locator("button", { name: "Update Staff" }).click();

  await page.isVisible(`text=Kaosarat`);
});
