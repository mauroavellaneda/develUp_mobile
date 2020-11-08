const { reloadApp } = require("detox-expo-helpers");
describe("Client and develuper can log in", () => {
  beforeEach(async () => {
    await reloadApp();
  });

  it("successfully client can login", async () => {
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
  it("unsuccessfully with wrong password or existing email", async () => {
    await expect(element(by.id("loginButton"))).toBeVisible();
    await element(by.id("loginButton")).tap();
    await element(by.id("emailLabel")).tap();
    await element(by.id("emailInput")).typeText("wrong@mail.com");
    await element(by.id("passwordLabel")).tap();
    await element(by.id("passwordInput")).typeText("wrongpassword");
    await element(by.id("loginContainer")).tap();
    await expect(element(by.id("submitButton"))).toBeVisible();
    await element(by.id("submitButton")).tap();
    await expect(element(by.id("errorMessage"))).toBeVisible();
  });
});
