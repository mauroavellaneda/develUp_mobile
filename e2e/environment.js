//environment.js
const { cleanup, init } = require("detox");
const adapter = require("detox/runners/jest/adapter");
const config = require("../package.json").detox;
// const nock = require('nock')
// const axios = require('axios')
// const { assignmentsResponse } = require('./mocks/assignmentsResponse')
// axios.defaults.adapter = require('axios/lib/adapters/http')
jest.setTimeout(120000);
jasmine.getEnv().addReporter(adapter);
// const assignments = assignmentsResponse()
// console.log(JSON.stringify(assignments))
// nock(/my-json-server.typicode.com/)
//   .get('/assignments')
//   .delayBody(200)
//   .reply(200, assignments)
beforeAll(async () => {
  // await nock(/my-json-server.typicode.com/)
  //   .get('/assignments')
  //   .reply(200, assignments)
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
