import {MissingPersonEntetie} from '../../../Domain/Enteties/MissingPerson'
import { MissingPersonRepository } from '../../../Domain/Repositories/MissingPersonRepository'

interface CreateMissingPersonRequest {
  name: string
  age: number
  gender: string
  last_location: string
  registered_by: number
  description: string
  first_photo: string
  status_id?: number
  second_photo?: string
  third_photo?: string
  fourth_photo?: string
}

export class CreateMissingPersonUseCase {
  constructor(private missingPersonRepository: MissingPersonRepository) {}
  async execute(data: CreateMissingPersonRequest): Promise<MissingPersonEntetie> {
    return this.missingPersonRepository.create(data)
  }
}

