import { ProvinceRepository } from 'App/Domain/Repositories/ProvinceRepository'
import { MunicipeEntetie } from 'App/Domain/Enteties/Municipe'
import Province from 'App/Models/Province'

export class ProvinceRepositoryImpl implements ProvinceRepository {

  async findAll(limit: number, page: number): Promise<MunicipeEntetie[]> {
    const locations = await Province.query().paginate(page, limit)
    return locations.toJSON().data as MunicipeEntetie[]
  }
}
