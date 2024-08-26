const { test, expect } = require("@playwright/test");

test("Should be able to reset password", async ({ page }) => {
  await page.goto("https://hospital-record-portal.onrender.com/login");
  await page
    .locator("xpath=//input[@name='email']")
    .fill("kaobadmus@gmail.com");
  await page.locator("xpath=//input[@name='password']").fill("kao0000");
  await page.getByRole("button", { name: "Log Into Your Account" }).click();


  await page.getByText("Reset Password").click();
  await expect(page).toHaveURL(/resetPassword/);
  await page
    .locator("xpath=//input[@name='email']")
    .fill("kaobadmus@gmail.com");
  await page.locator("xpath=//input[@name='currentPassword']").fill("kao0000");
  await page.locator("xpath=//input[@name='newPassword']").fill("kao0000");
  await page.getByRole("button", { name: "Reset Password" }).click();
});


