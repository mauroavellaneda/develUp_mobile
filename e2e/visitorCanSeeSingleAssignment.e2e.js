const { reloadApp } = require("detox-expo-helpers");
describe("Visitor can see single assignment", () => {
  beforeEach(async () => {
    await reloadApp();
  });

  it("successfully ", async () => {
    await expect(element(by.id("assignment-45"))).toExist();
    element(by.id("assignment-45")).tap();
    element(by.label("Build a Web page"));
    element(by.label("$ 500"));
    element(
      by.label(
        "I need to design a cool website with some Animation graphics and video. The New company is a PPE manufacturer and distributor. We will sell direct to the public."
      )
    );
    element(by.label("Skills: RubyJavascript"));
    element(by.label("Points: 320"));
  });
});
