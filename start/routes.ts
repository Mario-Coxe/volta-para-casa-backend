import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

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

  //municipes
  Route.group(() => {
    Route.post('/register', 'MunicipesController.store').middleware('auth')
    Route.get('/get-all', 'MunicipesController.index')
    Route.get('/get-by-search', 'MunicipesController.search')
  })
    .prefix('municipes-on')

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


}).prefix('v1/api')


//login and register
Route.group(() => {
  Route.post('/login', 'AuthController.login')
  Route.post('/register', 'AuthController.register')
}).prefix('auth')


Route.get('/', async () => {
  return { hello: 'VOLTA PARA CASA' }
})
