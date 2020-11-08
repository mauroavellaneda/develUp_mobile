const { reloadApp } = require("detox-expo-helpers");
describe("Client and develuper can log in", () => {
  beforeEach(async () => {
    await reloadApp();
  });

  it("successfully ", async () => {
    await expect(element(by.id("loginButton"))).toBeVisible();
    await element(by.id("loginButton")).tap();
    await element(by.id("emailLabel")).tap();
    await element(by.id("emailInput")).typeText("client@mail.com");
    await element(by.id("passwordLabel")).tap();
    await element(by.id("passwordInput")).typeText("password");
    await element(by.id("loginContainer")).tap();
    await expect(element(by.id("submitButton"))).toBeVisible();
    await element(by.id("submitButton")).tap();
    await expect(element(by.id("welcomeMessage"))).toBeVisible();
    await expect(element(by.id("createAssignmentButton"))).toBeVisible();
  });
  // it("unsuccessfully with wrong password and existing email", async () => {
  //   await expect(element(by.id("wantToPublishButton"))).toBeVisible();
  //   await element(by.id("wantToPublishButton")).tap();
  //   await element(by.id("emailLabel")).tap();
  //   await element(by.id("emailInput")).typeText(`user${randomize}@gmail.com`);
  //   await element(by.id("passwordLabel")).tap();
  //   await element(by.id("passwordInput")).typeText("password");
  //   await element(by.id("passwordConfirmationLabel")).tap();
  //   await element(by.id("passwordConfirmationInput")).typeText("wrongpassword");
  //   await element(by.id("companyNameLabel")).tap();
  //   await element(by.id("companyNameInput")).typeText("develup");
  //   await element(by.id("companyUrlLabel")).tap();
  //   await element(by.id("companyUrlInput")).typeText("develup.com");
  //   await element(by.id("mainContainer")).tap();
  //   await expect(element(by.id("submitButton"))).toBeVisible();
  //   await element(by.id("submitButton")).tap();
  //   await expect(element(by.id("errorMessageSubmit"))).toBeVisible();
  // });
});
