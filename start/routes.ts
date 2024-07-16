import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', async () => {
    return { hello: 'VOLTA PARA CASA' }
  })

  //user auth
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
    Route.post('/register', 'MunicipesController.store')
    Route.get('/get-all', 'MunicipesController.index')
    Route.get('/get-by-search', 'MunicipesController.search')
  })
    .prefix('municipes-on')
    .middleware('auth')

  //locations
  Route.group(() => {
    Route.post('/register', 'LocationsController.store')
    Route.get('/get-all', 'LocationsController.index')
    Route.get('/find-one/:id', 'LocationsController.show')
  })
    .prefix('locations-on')
    .middleware('auth')

  //missing people
  Route.group(() => {
    Route.post('/register', 'MissingPersonsController.store').middleware('auth')
    Route.get('/get-all', 'MissingPersonsController.index')
    Route.get('/find-one/:id', 'MissingPersonsController.show')
    Route.put('/update-one/:id', 'MissingPersonsController.update').middleware('auth')
    Route.delete('/delete-one/:id', 'MissingPersonsController.destroy').middleware('auth')
  })
    .prefix('missing-persons-on')
    .middleware('auth')


}).prefix('v1/api')
