const { test, expect } = require("@playwright/test");

test("should be able to login and logout", async ({ page }) => {
  await page.goto("https://hospital-record-portal.onrender.com/login");
  await page
    .locator("xpath=//input[@name='email']")
    .fill("kaobadmus@gmail.com");
  await page.locator("xpath=//input[@name='password']").fill("kao0000");
  await page.getByRole("button", { name: "Log Into Your Account" }).click();
  
  await page.getByText("Log Out").click();
  await expect(page).toHaveURL(/login/);
});
