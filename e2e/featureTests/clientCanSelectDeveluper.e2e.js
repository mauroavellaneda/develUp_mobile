const { reloadApp } = require("detox-expo-helpers");
describe("Client can select develuper", () => {
  beforeEach(async () => {
    await reloadApp();
    await expect(element(by.id("loginButton"))).toBeVisible();
    await element(by.id("loginButton")).tap();
    await element(by.id("emailLabel")).tap();
    await element(by.id("emailInput")).typeText("client@mail.com");
    await element(by.id("passwordLabel")).tap();
    await element(by.id("passwordInput")).typeText("password");
    await element(by.id("loginContainer")).tap();
    await element(by.id("submitButton")).tap();
    await expect(element(by.id("createAssignmentButton"))).toBeVisible();
  });

  it("successfully", async () => {
    await expect(element(by.id("assignment-89"))).toExist();
    await element(by.id("assignment-89")).tap();
    await expect(element(by.id("selectSecondApplicant"))).toBeVisible();
    await element(by.id("selectSecondApplicant")).tap();
    await expect(element(by.id("successfullySelectedMessage"))).toBeVisible();
  });
});
