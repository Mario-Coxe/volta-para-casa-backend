import { LocationRepository } from 'App/Domain/Repositories/LocationRepository'
import LocationModal from 'App/Models/Location'
import { LocationEntetie } from 'App/Domain/Enteties/Location'
import { DateTime } from 'luxon'

export class LocationRepositoryImpl implements LocationRepository {
  async create(data: Partial<LocationEntetie>): Promise<LocationEntetie> {
    const location = await LocationModal.create({
      name: data.name,
      municipe_id: data.municipe_id,
      longitude: data.longitude,
      latitude: data.latitude,
      createdAt: data.createdAt || DateTime.now(),
      updatedAt: data.updatedAt || DateTime.now(),
    })
    return location.toJSON() as LocationEntetie
  }

  async findAll(limit: number, page: number): Promise<LocationEntetie[]> {
    const locations = await LocationModal.query().preload('municipe').paginate(page, limit)
    return locations.toJSON().data as LocationEntetie[]
  }

  async searchByName(name: string): Promise<LocationEntetie[]> {
    const locations = await LocationModal.query()
      .where('name', 'like', `%${name}%`)
      .preload('municipe')

    return locations as [] as LocationEntetie[]
  }

  async findById(id: number): Promise<LocationEntetie[]> {
    const locations = await LocationModal.query().where('id', id).preload('municipe')
    return locations as [] as LocationEntetie[]
  }
}
