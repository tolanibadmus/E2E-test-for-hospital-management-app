const { test, expect } = require("@playwright/test");

test("should be able to delete staff", async ({ page }) => {
  await page.goto("https://hospital-record-portal.onrender.com/login");
  await page
    .locator("xpath=//input[@name='email']")
    .fill("kaobadmus@gmail.com");
  await page.locator("xpath=//input[@name='password']").fill("kao0000");
  await page.getByRole("button", { name: "Log Into Your Account" }).click();

  await page.getByRole("link", { name: "Staff" }).click();
  await expect(page.locator(".title-wrapper")).toContainText("All Staff");

  let rowCount = await page.getByRole("row").count();

  const deleteRow = await page.getByRole("row").nth(2);
  await deleteRow.locator(".anchor-link-form").click();

  const newRowCount = rowCount - 1;

  await expect(await page.getByRole("row").count()).toBe(newRowCount);
});
