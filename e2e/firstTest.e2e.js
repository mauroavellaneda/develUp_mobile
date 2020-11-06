//firstTest.e2e.js
const { reloadApp } = require("detox-expo-helpers");
describe("App", () => {
  beforeAll(async () => {
    await reloadApp();
  });
  it("is expected to have elements within assignment", async () => {
    await expect(element(by.id("assignment-36"))).toExist();
    await expect(element(by.label("Build a Web page"))).toBeVisible();
    await expect(element(by.label("Build a Web page"))).toHaveId("title-36");
    await expect(element(by.id("budget-36"))).toHaveLabel("$ 500");
    await expect(element(by.id("skills-36"))).toHaveLabel(
      "Skills: Ruby Javascript"
    );
    await expect(element(by.id("points-36"))).toHaveLabel("Points: 320");
  });
});
it("is expected to scroll up", async () => {
  await expect(element(by.id("scroll"))).toExist();
  await element(by.id("scroll")).swipe("up");
  await expect(
    element(by.label("Build a Full Stack Rails application"))
  ).toBeVisible();
  await expect(
    element(by.label("Build a Full Stack Rails application"))
  ).toHaveId("title-49");
  await expect(element(by.id("budget-49"))).toHaveLabel("$ 300");
  await expect(element(by.id("skills-49"))).toHaveLabel("Skills: Ruby");
  await expect(element(by.id("points-49"))).toHaveLabel("Points: 220");
});
