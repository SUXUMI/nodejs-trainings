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

