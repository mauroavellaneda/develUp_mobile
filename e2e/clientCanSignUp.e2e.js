const { reloadApp } = require("detox-expo-helpers");
describe("App", () => {
  beforeAll(async () => {
    await reloadApp();
  });
  //   const login = async () => {
  //       await element(by.id('userEmail')).typeText('user@mail.com')
  //   }
  //   it("should login with right credentials", async () => {
  //     await expect(element(by.id("emailInput"))).toExist();

  //   });

  it('should show "first button" at the begging', async () => {
    await expect(element(by.id("firstButton"))).toBeVisible();
    await element(by.id("firstButton")).tap();
    await element(by.id("emailInput")).tap();
    await element(by.id("emailField")).typeText("user@gmail.com");
    await element(by.id("passwordLabel")).tap();
    await element(by.id("passwordInput")).typeText("password");
    await element(by.id("passwordConfirmationLabel")).tap();
    await element(by.id("passwordConfirmationInput")).typeText("password");
    await element(by.id("companyNameLabel")).tap();
    await element(by.id("companyNameInput")).typeText("develup");
    await element(by.id("companyUrlLabel")).tap();
    await element(by.id("companyUrlInput")).typeText("develup.com");
    await expect(element(by.id("submitButton"))).toBeVisible();
    // await element(by.id("submitButton")).tap();
  });
});

