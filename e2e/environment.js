const { cleanup, init } = require("detox");
const adapter = require("detox/runners/jest/adapter");
const config = require("../package.json").detox;

jest.setTimeout(120000);
jasmine.getEnv().addReporter(adapter);

beforeAll(async () => {
  await init(config);
});
beforeEach(async () => {
  await adapter.beforeEach();
});
afterEach(async () => {});
afterAll(async () => {
  await adapter.afterAll();
  await cleanup();
});
