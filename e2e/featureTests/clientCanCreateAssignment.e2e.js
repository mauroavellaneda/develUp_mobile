const { reloadApp } = require("detox-expo-helpers");
describe("Client can create assignments", () => {
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
    await element(by.id("createAssignmentButton")).tap();
  });

  it("successfully", async () => {
    await element(by.id("titleInput")).tap();
    await element(by.id("titleInput")).tap();
    await element(by.id("titleInput")).typeText("Build a Webpage");
    await element(by.id("descriptionLabel")).tap();
    await element(by.id("descriptionInput")).typeText("Built in React");
    await element(by.id("timeFrameLabel")).tap();
    await element(by.id("timeFrameInput")).typeText("96");
    await element(by.id("budgetLabel")).tap();
    await element(by.id("budgetInput")).typeText("500");
    await element(by.id("skills-1")).tap();
    await expect(element(by.id("publishButton"))).toBeVisible();
    await element(by.id("publishButton")).tap();
    await expect(element(by.id("successfullyCreatedMessage"))).toBeVisible();
  });

  it("unsuccessfully with missing fields", async () => {
    await element(by.id("createAssignmentButton")).tap();
    await expect(element(by.id("titleAssignment"))).toBeVisible();
    await element(by.id("skills-1")).tap();
    await expect(element(by.id("publishButton"))).toBeVisible();
    await element(by.id("publishButton")).tap();
    await expect(element(by.id("createErrorMessage"))).toBeVisible();
  });
});
