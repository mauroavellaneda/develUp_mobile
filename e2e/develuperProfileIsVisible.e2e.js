const { reloadApp } = require("detox-expo-helpers");
describe("Client can create assignments", () => {
  beforeEach(async () => {
    await reloadApp();
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
  });

  it.only("successfully ", async () => {
    element(by.label("Welcome Develuper"));
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
