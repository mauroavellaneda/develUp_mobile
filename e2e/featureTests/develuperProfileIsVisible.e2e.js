const { reloadApp } = require("detox-expo-helpers");
describe("Client can create assignments", () => {
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

  it("successfully ", async () => {
    await expect(element(by.id("assignment-45"))).toExist();
    element(by.id("assignment-45")).tap();
    await expect(element(by.id("applyButton"))).toBeVisible();
    await element(by.id("applyButton")).tap();
    await expect(element(by.id("develuperMyPageButton"))).toExist();
    await element(by.id("develuperMyPageButton")).tap();
    await expect(element(by.id("develuperName"))).toBeVisible();
    element(by.label("develuperName"));
    element(by.label("Completed Projects:"));
    element(by.label("Ongoing Projects:"));
    element(by.label("Level:"));
    element(
      by.label(
        "I need to design a cool website with some Animation graphics and video. The New company is a PPE manufacturer and distributor. We will sell direct to the public."
      )
    );
    element(by.label("Skills: Ruby JavaScript"));
    element(by.label("Points: 320"));
  });
});
