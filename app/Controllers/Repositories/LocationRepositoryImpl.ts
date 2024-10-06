import { LocationRepository } from 'App/Domain/Repositories/LocationRepository'
import LocationModal from 'App/Models/Location'
import { Location } from 'App/Domain/Enteties/Location'
import { DateTime } from 'luxon'


export class LocationRepositoryImpl implements LocationRepository {
  async create(data: Partial<Location>): Promise<Location> {
    const municipe = await LocationModal.create({
      name: data.name,
      municipe_id: data.municipe_id,
      createdAt: data.createdAt || DateTime.now(),
      updatedAt: data.updatedAt || DateTime.now(),
    })
    return municipe.toJSON() as Location
  }

  async findAll(limit: number, page: number): Promise<Location[]> {
    const locations = await LocationModal.query()
      .preload('municipe')
      .paginate(page, limit)

    return locations.toJSON().data as Location[]
  }

  async searchByName(name: string): Promise<Location[]> {
    const locations = await LocationModal.query()
      .where('name', 'like', `%${name}%`)
      .preload('municipe')

    return locations as Location[]
  }
}
