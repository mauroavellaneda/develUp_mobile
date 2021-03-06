const { reloadApp } = require("detox-expo-helpers");
const randomize = Math.floor(Math.random() * 10000);
describe("Client can sign up", () => {
  beforeEach(async () => {
    await reloadApp();
  });

  it("successfully ", async () => {
    await element(by.id("navigationButton")).tap();
    await element(by.id("emailLabel")).tap();
    await element(by.id("emailInput")).typeText("client6789@mail.com");
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
    await element(by.id("createAssignmentButton")).tap();
  });
  it("unsuccessfully with wrong password and existing email", async () => {
    await expect(element(by.id("navigationButton"))).toBeVisible();
    await element(by.id("navigationButton")).tap();
    await element(by.id("emailLabel")).tap();
    await element(by.id("emailInput")).typeText("client6789@mail.com");
    await element(by.id("passwordLabel")).tap();
    await element(by.id("passwordInput")).typeText("password");
    await element(by.id("passwordConfirmationLabel")).tap();
    await element(by.id("passwordConfirmationInput")).typeText("wrongpassword");
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
