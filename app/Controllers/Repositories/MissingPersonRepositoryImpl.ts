import { MissingPerson } from './../../Domain/Enteties/MissingPerson'
import MissingPersonModel from 'App/Models/MissingPerson'
import { DateTime } from 'luxon'
import { MissingPersonRepositoy } from '../../Domain/Repositories/MissingPersonRepositoy'

export class MissingPersonRepositoryImpl implements MissingPersonRepositoy {
  async create(data: Partial<MissingPerson>): Promise<MissingPerson> {
    const person = await MissingPersonModel.create({
      name: data.name,
      age: data.age,
      gender: data.gender,
      last_location: data.last_location,
      registered_by: data.registered_by,
      description: data.description,
      first_photo: data.first_photo,
      status_id: data.status_id,
      second_photo: data.second_photo,
      third_photo: data.third_photo,
      fourth_photo: data.fourth_photo,
      createdAt: data.createdAt || DateTime.now(),
      updatedAt: data.updatedAt || DateTime.now(),
    })
    return person.toJSON() as MissingPerson
  }

  async findAll(limit: number, page: number): Promise<MissingPerson[]> {
    const person = await MissingPersonModel.query()
      .preload('user')
      .preload('status')
      .paginate(page, limit)

    return person.toJSON().data as MissingPerson[]
  }

  async searchByName(name: string): Promise<MissingPerson[]> {
    const person = await MissingPersonModel.query()
      .where('name', 'like', `%${name}%`)
      .preload('user')
      .preload('status')

    return person as MissingPerson[]
  }

  async findById(id: number): Promise<MissingPerson[]> {
    const person = await MissingPersonModel.query()
      .where('id', id)
      .preload('user')
      .preload('status')
    return person as [] as MissingPerson[]
  }
}
