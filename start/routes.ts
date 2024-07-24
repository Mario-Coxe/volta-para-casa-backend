import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

  //users
  Route.group(() => {
    Route.put('/update-profile', 'UsersController.updateProfile')
  })
    .prefix('users')
    .middleware('auth')

  //provinces
  Route.group(() => {
    Route.get('/', 'ProvincesController.index')
  })
    .prefix('provinces')

  //municipes
  Route.group(() => {
    Route.post('/', 'MunicipesController.store').middleware('auth')
    Route.get('/', 'MunicipesController.index')
    Route.get('/search', 'MunicipesController.search')
  })
    .prefix('municipes')

  //locations
  Route.group(() => {
    Route.post('/', 'LocationsController.store').middleware('auth')
    Route.get('/', 'LocationsController.index')
    Route.get('/:id', 'LocationsController.show')
  })
    .prefix('locations')


  //missing people
  Route.group(() => {
    Route.post('/register', 'MissingPersonsController.store').middleware('auth')
    Route.get('/get-all', 'MissingPersonsController.index')
    Route.get('/find-one/:id', 'MissingPersonsController.show')
    Route.put('/update-one/:id', 'MissingPersonsController.update').middleware('auth')
    Route.delete('/delete-one/:id', 'MissingPersonsController.destroy').middleware('auth')
  })
    .prefix('missing-persons')


}).prefix('v1/api')


//login and register
Route.group(() => {
  Route.post('/login', 'AuthController.login')
  Route.post('/register', 'AuthController.register')
}).prefix('auth')


Route.get('/', async () => {
  return { hello: 'VOLTA PARA CASA' }
})
