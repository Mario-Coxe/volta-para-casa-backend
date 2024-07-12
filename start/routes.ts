import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', async () => {
    return { hello: 'world' }
  })

  Route.group(() => {
    Route.post('/register', 'UsersController.register')
    Route.post('/login', 'AuthController.login')
    Route.post('/reset-password', 'UsersController.resetPassword')
  }).prefix('users')
}).prefix('v1/api')
