// app/Infra/Repositories/MunicipeRepositoryImpl.ts
import { MunicipeRepository } from 'App/Domain/Repositories/MunicipeRepository'
import MunicipeModel from 'App/Models/Municipe'
import { Municipe } from 'App/Domain/Enteties/Municipe'
import { DateTime } from 'luxon'

export class MunicipeRepositoryImpl implements MunicipeRepository {
  async create(data: Partial<Municipe>): Promise<Municipe> {
    const municipe = await MunicipeModel.create({
      name: data.name,
      provinceId: data.provinceId,
      createdAt: data.createdAt || DateTime.now(),
      updatedAt: data.updatedAt || DateTime.now(),
    })
    return municipe.toJSON() as Municipe
  }

  async findAll(limit: number, page: number): Promise<Municipe[]> {
    const municipes = await MunicipeModel.query()
      .preload('province')
      .paginate(page, limit)

    return municipes.toJSON().data as Municipe[]
  }

  async searchByName(name: string): Promise<Municipe[]> {
    const municipes = await MunicipeModel.query()
      .where('name', 'like', `%${name}%`)
      .preload('province')

    return municipes as Municipe[]
  }
}
