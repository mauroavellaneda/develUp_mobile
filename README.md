# develUp_mobile

### Mocking API
We use `mockserver` to mock the server responses.

##### Usae
in CLI
```
$  mockserver -p 3000 -m './e2e/mocks'
```

in test configuration: the mockServer is located in `e2e/mockServer.js`

```js
// start server
let server = mockServer.open(<port number>)
```
```js
// close server
mockServer.close(server)
```
