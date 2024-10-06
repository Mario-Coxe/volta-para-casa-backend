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
  }).prefix('provinces')

  //municipes
  Route.group(() => {
    Route.post('/', 'MunicipesController.store').middleware('auth')
    Route.get('/', 'MunicipesController.index')
    Route.get('/search', 'MunicipesController.search')
  }).prefix('municipes')


  //locations
  Route.group(() => {
    Route.post('/', 'LocationsController.store').middleware('auth')
    Route.get('/', 'LocationsController.index')
    Route.get('/:id', 'LocationsController.show')
  }).prefix('locations')

  
  //missing people
  Route.group(() => {
    Route.post('', 'MissingPersonsController.store').middleware('auth')
    Route.post('/follow/:id', 'MissingPersonsController.follow').middleware('auth')
    Route.post('/unfollow/:id', 'MissingPersonsController.unfollow').middleware('auth')
    Route.get('/', 'MissingPersonsController.index')
    Route.get('/:id', 'MissingPersonsController.show').middleware('auth')
    Route.put('/:id', 'MissingPersonsController.update').middleware('auth')
    Route.delete('/:id', 'MissingPersonsController.destroy').middleware('auth')
  }).prefix('missing-persons')
}).prefix('v1/api')

//login and register
Route.group(() => {
  Route.post('/login', 'AuthController.login')
  Route.post('/register', 'AuthController.register')
}).prefix('auth')

Route.get('/', async () => {
  return { hello: 'VOLTA PARA CASA' }
})
