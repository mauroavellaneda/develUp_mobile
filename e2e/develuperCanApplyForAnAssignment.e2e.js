const { reloadApp } = require("detox-expo-helpers");
describe("Develuper can apply for an assignment", () => {
  beforeEach(async () => {
    await reloadApp();
  });
  it("successfully", async () => {
    await expect(element(by.id("loginButton"))).toBeVisible();
    await element(by.id("loginButton")).tap();
    await element(by.id("emailLabel")).tap();
    await element(by.id("emailInput")).typeText("develuper@mail.com");
    await element(by.id("passwordLabel")).tap();
    await element(by.id("passwordInput")).typeText("password");
    await expect(element(by.id("submitButton"))).toBeVisible();
    await element(by.id("submitButton")).tap();
    await expect(element(by.id("navigationButton"))).toBeVisible();
    await expect(element(by.id("navigationButton"))).toHaveLabel(
      "Profile page"
    );
    await expect(element(by.id("scroll"))).toExist();
    await element(by.id("scroll")).swipe("up");
    await expect(element(by.id("assignment-133"))).toExist();
    await element(by.id("assignment-133")).tap();
    // await expect(element(by.id("applyButton"))).toBeVisible();
    // await element(by.id("applyButton")).tap();
    await expect(element(by.id("successfullyAppliedMessage"))).toBeVisible();
    await expect(element(by.id("successfullyAppliedMessage"))).toHaveLabel(
      "You have Applied! Keep Browsing"
    );
  });
});
