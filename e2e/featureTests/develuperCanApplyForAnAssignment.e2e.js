const { reloadApp } = require("detox-expo-helpers");
describe("Develuper can apply for an assignment", () => {
  beforeEach(async () => {
    await reloadApp();
    await expect(element(by.id("loginButton"))).toBeVisible();
    await element(by.id("loginButton")).tap();
    await element(by.id("emailLabel")).tap();
    await element(by.id("emailInput")).typeText("develuper@mail.com");
    await element(by.id("passwordLabel")).tap();
    await element(by.id("passwordInput")).typeText("password");
    await element(by.id("loginContainer")).tap();
    await element(by.id("submitButton")).tap();
  });

  it("successfully", async () => {
    await expect(element(by.id("assignment-45"))).toExist();
    await expect(element(by.id("assignment-45"))).toBeVisible();

    await element(by.id("assignment-45")).tap();
    await expect(element(by.id("applyButton"))).toBeVisible();
    await element(by.id("applyButton")).tap();
    await expect(element(by.id("successfullyAppliedMessage"))).toBeVisible();
    await expect(element(by.id("successfullyAppliedMessage"))).toHaveLabel(
      "You have Applied! Keep Browsing"
    );
  });
});
