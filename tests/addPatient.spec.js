const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("https://hospital-record-portal.onrender.com/login");
  await page
    .locator("xpath=//input[@name='email']")
    .fill("kaobadmus@gmail.com");
  await page.locator("xpath=//input[@name='password']").fill("kao0000");
  await page.getByRole("button", { name: "Log Into Your Account" }).click();

  await page.getByRole("link", { name: "Patients" }).click();
  await expect(page.locator(".title-wrapper")).toContainText("All Patients");
});

test.describe("registration and documentation", () => {
  test("Should be able to add patient", async ({ page }) => {
    const emailSelector = `text="ayobadmus@gmail.com"`;
    const emailInUse = await page.isVisible(emailSelector);
    if (emailInUse) {
      console.log("email has already been used");
      return;
    }
    await page.getByRole("link", { name: "Register New Patient" }).click();
    await expect(page.locator(".top-nav")).toContainText("Register Patient");

    await page.locator("//input[@name='firstName']").fill("Ayo");
    await page.locator("//input[@name='lastName']").fill("Badmus");
    await page.locator("//input[@name='dob']").fill("2000-10-20");
    await page.locator(".gender-dropdown").selectOption("male");
    await page.locator("//input[@name='email']").fill("ayobadmus@gmail.com");
    await page.locator("//input[@name='address']").fill("2, salami str, lagos");
    await page.locator("//input[@name='occupation']").fill("Teacher");
    await page.locator("//input[@name='nextOfKin']").fill("Tayo badmus");
    await page.locator("button", { name: "Register Patient" }).click();

    await expect(page.locator("tr").nth(1)).toContainText(
      "ayobadmus@gmail.com"
    );
  });

  test("should be able to book appointment for patient", async ({ page }) => {
    const patient = await page.getByRole("row").nth(1);
    await patient.locator(".anchor-link").click();
    await expect(page.locator(".patient-p")).toContainText("Ayo Badmus");
    await page.locator(".primary-button-anchor").click();
    await page.locator("//input[@name='appointmentDate']").fill("2024-09-08");
    await page
      .locator("//textarea[@name='apptReason']")
      .fill("I need to see a dentist for my toothache");
    await page.locator("button", { name: "Book an Appointment" }).click();

    await page.locator("//button[@id='appointmentsTabLink']").click();
    await page.isVisible(`text="I need to see a dentist for my toothache"`);
  });

  test("should be able to document for each appointment", async ({ page }) => {
    const patient = await page.getByRole("row").nth(1);
    await patient.locator(".anchor-link").click();
    await page.locator("xpath=//button[@id='appointmentsTabLink']").click();
    const appointment = await page.getByRole("row").nth(1);
    await appointment.locator(".anchor-link").click();

    await page.locator("xpath=//button[@id='nurseTabLink']").click();
    const existingNurseDocumentation = await page
      .locator("xpath=//textarea[@name='nurseDocumentation']")
      .inputValue();
    await page
      .locator("xpath=//textarea[@name='nurseDocumentation']")
      .fill(existingNurseDocumentation + "aaa");
    await page
      .locator(
        "//div[@id='nurseTabContent']//button[@type='submit'][normalize-space()='Update Documentation']"
      )
      .click();

    await page.locator("xpath=//button[@id='docTabLink']").click();
    const existingDoctorDocumentation = await page
      .locator("xpath=//textarea[@name='doctorDocumentation']")
      .inputValue();
    await page
      .locator("xpath=//textarea[@name='doctorDocumentation']")
      .fill(existingDoctorDocumentation + "bbb");
    await page
      .locator(
        "//div[@id='docTabContent']//button[@type='submit'][normalize-space()='Update Documentation']"
      )
      .click();
  });
});
