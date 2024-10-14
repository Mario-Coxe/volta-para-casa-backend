import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CreateMunicipeUseCase } from 'App/Application/useCases/Municipes/CreateMunicipeUseCase'
import { GetAllMunicipesUseCase } from 'App/Application/useCases/Municipes/GetAllMunicipesUseCase'
// import { SearchMunicipeUseCase } from 'App/Application/useCases/Municipes/SearchMunicipeUseCase';
import { MunicipeRepositoryImpl } from '../Repositories/MunicipeRepositoryImpl'
import { FindMunicipeByProvinceIdUseCase } from 'App/Application/useCases/Municipes/FindMunicipeByProvinceIdUseCase'

export default class MunicipesController {
  private municipeRepository: MunicipeRepositoryImpl

  constructor() {
    this.municipeRepository = new MunicipeRepositoryImpl()
  }

  public async store({ request, response }: HttpContextContract) {
    const createMunicipeUseCase = new CreateMunicipeUseCase(this.municipeRepository)
    const data = request.only(['name', 'province_id'])
    const municipe = await createMunicipeUseCase.execute(data)
    return response.ok({ message: 'Município Registado', municipe })
  }

  public async index({ request, response }: HttpContextContract) {
    const getAllMunicipesUseCase = new GetAllMunicipesUseCase(this.municipeRepository)
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const municipes = await getAllMunicipesUseCase.execute(limit, page)
    return response.ok(municipes)
  }

  public async findByProvinceId({ request, response }: HttpContextContract) {
    const findMunicipeByProvinceIdUseCase = new FindMunicipeByProvinceIdUseCase(
      this.municipeRepository
    )
    const provinceId = request.input('province_id')
    if (!provinceId) {
      return response.badRequest({ message: 'O ID da província é obrigatório.' })
    }

    const municipes = await findMunicipeByProvinceIdUseCase.execute(provinceId)
    return response.ok(municipes)
  }

  /*
  public async search({ request, response }: HttpContextContract) {
    const searchMunicipeUseCase = new SearchMunicipeUseCase(this.municipeRepository);
    const name = request.input('name');
    const municipes = await searchMunicipeUseCase.execute(name);
    return response.ok(municipes);
  }*/
}
