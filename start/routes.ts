import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', async () => {
    return { hello: 'world' }
  })

  //user routes
  Route.group(() => {
    Route.post('/login', 'AuthController.login')
    Route.post('/register', 'AuthController.register')
  }).prefix('users')

  //users on
  Route.group(() => {
    Route.put('/update-profile', 'UsersController.updateProfile')
    Route.post('/reset-password', 'UsersController.resetPassword')
  })
    .prefix('users-on')
    .middleware('auth')

  //provinces
  Route.group(() => {
    Route.get('/get-all', 'ProvincesController.index')
  })
    .prefix('provinces-on')
    .middleware('auth')

  //municipes
  Route.group(() => {
    Route.post('/register', 'MunicipesController.index')
  })
    .prefix('municipes-on')
    .middleware('auth')
}).prefix('v1/api')
