const { reloadApp } = require("detox-expo-helpers");
describe("Client and develuper can log in", () => {
  beforeEach(async () => {
    await reloadApp();
  });

  xit("successfully client can login", async () => {
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

  it("Develuper can login and see single assignmnet", async () => {
    await expect(element(by.id("loginButton"))).toBeVisible();
    await element(by.id("loginButton")).tap();
    await element(by.id("emailLabel")).tap();
    await element(by.id("emailInput")).typeText("develuper@mail.com");
    await element(by.id("passwordLabel")).tap();
    await element(by.id("passwordInput")).typeText("password");
    await element(by.id("loginContainer")).tap();
    await expect(element(by.id("submitButton"))).toBeVisible();
    await element(by.id("submitButton")).tap();
    await expect(element(by.id("assignment-45"))).toExist();
    element(by.id("assignment-45")).tap();
    element(by.label("Build a Web page"));
    element(by.label("$ 500"));
    element(
      by.label(
        "I need to design a cool website with some Animation graphics and video. The New company is a PPE manufacturer and distributor. We will sell direct to the public."
      )
    );
    element(by.label("Skills: Ruby JavaScript"));
    element(by.label("Points: 320")); 
  });

  xit("unsuccessfully with wrong password or existing email", async () => {
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
