const { test, expect} = require('@playwright/test')

test('should be able to add new staff', async ({page}) => {
  await page.goto("https://hospital-record-portal.onrender.com/login");
  await page
    .locator("xpath=//input[@name='email']")
    .fill("kaobadmus@gmail.com");
  await page.locator("xpath=//input[@name='password']").fill("kao0000");
  await page.getByRole("button", { name: "Log Into Your Account" }).click();

  await page.getByRole("link", { name: "Staff" }).click();
  await expect(page.locator(".title-wrapper")).toContainText("All Staff");

  const emailSelector = `text="tolababs@gmail.com"`;
  const emailInUse =  await page.isVisible(emailSelector);
  if (emailInUse) {
    console.log("email has already been used");
    return;
  }

  await page.getByRole("link", { name: "Add New Staff"}).click()
  await expect(page.locator(".top-nav")).toContainText("Add New Staff");

  await page.locator("//input[@name='firstName']").fill("Tolani")
  await page.locator("//input[@name='lastName']").fill("Babs")
  await page.locator(".gender-dropdown").selectOption("female");
  await page.locator("//input[@name='email']").fill("tolababs@gmail.com")
  await page.locator(".dept-dropdown").selectOption("Pharmacy");
  await page.locator("//input[@name='qualification']").fill("Bachelors degree")
  await page.locator("button", { name: "Add New Staff" }).click();

  await expect(page.locator("tr").last()).toContainText("tolababs@gmail.com");


})