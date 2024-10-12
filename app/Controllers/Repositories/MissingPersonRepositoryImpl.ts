import MissingPerson from 'App/Models/MissingPerson'
import MissingPersonView from 'App/Models/MissingPersonView'
import { DateTime } from 'luxon'
import { MissingPersonEntetie } from '../../Domain/Enteties/MissingPerson'
import { MissingPersonRepository } from 'App/Domain/Repositories/MissingPersonRepository'

export class MissingPersonRepositoryImpl implements MissingPersonRepository {
  async create(data: Partial<MissingPersonEntetie>): Promise<MissingPersonEntetie> {
    const missingPerson = await MissingPerson.create({
      name: data.name,
      age: data.age,
      gender: data.gender,
      last_location: data.last_location,
      registered_by: data.registered_by,
      description: data.description,
      first_photo: data.first_photo,
      second_photo: data.second_photo,
      third_photo: data.third_photo,
      fourth_photo: data.fourth_photo,
      status_id: data.status_id,
      createdAt: data.createdAt || DateTime.now(),
      updatedAt: data.updatedAt || DateTime.now(),
    })
    return missingPerson.toJSON() as MissingPersonEntetie
  }
  
  async findAll(limit: number, page: number): Promise<MissingPersonEntetie[]> {
    const missingPeople = await MissingPerson.query()
      .preload('user')
      .preload('status')
      .paginate(page, limit)
    return missingPeople.toJSON().data as MissingPersonEntetie[]
  }

  async searchByName(name: string): Promise<MissingPersonEntetie[]> {
    const missingPeople = await MissingPerson.query()
      .where('name', 'like', `%${name}%`)
      .preload('user')
      .preload('status')
    return missingPeople as unknown as MissingPersonEntetie[]
  }

  async findById(id: number): Promise<MissingPersonEntetie> {
    const missingPerson = await MissingPerson.query()
      .where('id', id)
      .preload('user')
      .preload('status')
      .firstOrFail()
    return missingPerson.toJSON() as MissingPersonEntetie
  }

  async view(id: number): Promise<MissingPersonView[]> {
    const views = await MissingPersonView.query().where('missing_person_id', id)
    return views as MissingPersonView[]
  }
}
