import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { GetAllProviceUseCase } from 'App/Application/useCases/Province/GetAllProviceUseCase'
import { ProvinceRepositoryImpl } from '../Repositories/ProvinceRepositoryImpl'

export default class ProvincesController {
  private provinceRepository: ProvinceRepositoryImpl

  constructor() {
    this.provinceRepository = new ProvinceRepositoryImpl()
  }

  public async index({ request, response }: HttpContextContract) {
    const getAllProviceUseCase = new GetAllProviceUseCase(this.provinceRepository)
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const provinces = await getAllProviceUseCase.execute(limit, page)
    return response.ok(provinces)
  }
}
