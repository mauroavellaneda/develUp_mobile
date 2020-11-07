const { reloadApp } = require("detox-expo-helpers");
describe("App", () => {
  beforeEach(async () => {
    await reloadApp();
  });

  it("successfully sign up", async () => {
    await expect(element(by.id("wantToPublishButton"))).toBeVisible();
    await element(by.id("wantToPublishButton")).tap();
    await element(by.id("emailInput")).tap();
    await element(by.id("emailField")).typeText("user43535433ee7777@gmail.com");
    await element(by.id("passwordLabel")).tap();
    await element(by.id("passwordInput")).typeText("password");
    await element(by.id("passwordConfirmationLabel")).tap();
    await element(by.id("passwordConfirmationInput")).typeText("password");
    await element(by.id("companyNameLabel")).tap();
    await element(by.id("companyNameInput")).typeText("develup");
    await element(by.id("companyUrlLabel")).tap();
    await element(by.id("companyUrlInput")).typeText("develup.com");
    await element(by.id("mainContainer")).tap();
    await expect(element(by.id("submitButton"))).toBeVisible();
    await element(by.id("submitButton")).tap();
    await expect(element(by.id("welcomeMessage"))).toBeVisible();
    await expect(element(by.id("createAssignmentButton"))).toBeVisible();
  });
  it("unsuccessfully sign up", async () => {
    await expect(element(by.id("wantToPublishButton"))).toBeVisible();
    await element(by.id("wantToPublishButton")).tap();
    await element(by.id("emailInput")).tap();
    await element(by.id("emailField")).typeText("user435354@gmail.com");
    await element(by.id("passwordLabel")).tap();
    await element(by.id("passwordInput")).typeText("password");
    await element(by.id("passwordConfirmationLabel")).tap();
    await element(by.id("passwordConfirmationInput")).typeText("passwordaas");
    await element(by.id("companyNameLabel")).tap();
    await element(by.id("companyNameInput")).typeText("develup");
    await element(by.id("companyUrlLabel")).tap();
    await element(by.id("companyUrlInput")).typeText("develup.com");
    await element(by.id("mainContainer")).tap();
    await expect(element(by.id("submitButton"))).toBeVisible();
    await element(by.id("submitButton")).tap();
    await expect(element(by.id("errorMessageSubmit"))).toBeVisible();
  });
});
