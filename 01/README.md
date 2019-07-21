# Write mini router in ./lib.js file to satisfy requirements of app.js file

Contents of app.js:

```js
const Router = require('./lib')

const users = []

const router = new Router()

router.get('/users', ctx => {
  ctx.res.json(users)
})

router.post('/users', ctx => {
  const user = ctx.req.body
  users.push(user)
  ctx.res.json(user)
})

router.listen(8001, () => {
  console.log('Server listens to http://localhost:8001')
})

```

Notes:

* Don't use `class` keyword while implementing the `Router` constructor

Resources:

* [Anatomy of an HTTP Transaction](https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/)
