const { cleanup, init } = require("detox");
const adapter = require("detox/runners/jest/adapter");
const config = require("../package.json").detox;
const { mockServer } = require('./mockServer')

let server
jest.setTimeout(120000);
jasmine.getEnv().addReporter(adapter);

beforeAll(async () => {
  server = mockServer.open(3000)
  await init(config);
});
beforeEach(async () => {
  await adapter.beforeEach();
});
afterEach(async () => { });
afterAll(async () => {
  mockServer.close(server)
  await adapter.afterAll();
  await cleanup();
});
