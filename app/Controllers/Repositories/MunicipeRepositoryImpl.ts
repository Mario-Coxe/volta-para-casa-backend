import { MunicipeRepository } from 'App/Domain/Repositories/MunicipeRepository'
import MunicipeModel from 'App/Models/Municipe'
import { MunicipeEntetie } from 'App/Domain/Enteties/Municipe'
import { DateTime } from 'luxon'

export class MunicipeRepositoryImpl implements MunicipeRepository {
  async create(data: Partial<MunicipeEntetie>): Promise<MunicipeEntetie> {
    const municipe = await MunicipeModel.create({
      name: data.name,
      provinceId: data.province_id,
      createdAt: data.createdAt || DateTime.now(),
      updatedAt: data.updatedAt || DateTime.now(),
    })
    return municipe.toJSON() as MunicipeEntetie
  }

  async findAll(limit: number, page: number): Promise<MunicipeEntetie[]> {
    const municipes = await MunicipeModel.query()
      .preload('province')
      .paginate(page, limit)

    return municipes.toJSON().data as MunicipeEntetie[]
  }

  async searchByName(name: string): Promise<MunicipeEntetie[]> {
    const municipes = await MunicipeModel.query()
      .where('name', 'like', `%${name}%`)
      .preload('province')

    return municipes as unknown as MunicipeEntetie[]
  }
}
