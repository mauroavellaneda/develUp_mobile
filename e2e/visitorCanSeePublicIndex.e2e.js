//firstTest.e2e.js
const { reloadApp } = require("detox-expo-helpers");
describe("Visitor can see public index", () => {
  beforeAll(async () => {
    await reloadApp();
  });
  it("is expected to have elements within assignment card", async () => {
    await expect(element(by.id("assignment-100"))).toExist();
    await expect(element(by.id("title-100"))).toHaveLabel("Build a Web page");
    await expect(element(by.id("budget-100"))).toHaveLabel("$ 500");
    await expect(element(by.id("skills-100"))).toHaveLabel(
      "Skills: Ruby JavaScript"
    );
    await expect(element(by.id("points-100"))).toHaveLabel("Points: 320");
  });
  it("is expected to have ability to scroll up", async () => {
    await expect(element(by.id("scroll"))).toExist();
    await element(by.id("scroll")).swipe("up");
    await expect(element(by.id("title-14"))).toHaveLabel("Build a Full Stack Rails application");
    await expect(element(by.id("budget-14"))).toHaveLabel("$ 300");
    await expect(element(by.id("skills-14"))).toHaveLabel("Skills: Ruby");
    await expect(element(by.id("points-14"))).toHaveLabel("Points: 220");
  });
});
