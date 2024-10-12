import { MissingPersonRepository } from './../../../Domain/Repositories/MissingPersonRepository';
import {MissingPersonEntetie} from '../../../Domain/Enteties/MissingPerson'

export class FindByIdMissingPersonUseCase {
  constructor(private missingRepository: MissingPersonRepository) {}

  async execute(id: number): Promise<MissingPersonEntetie> {
    return this.missingRepository.findById(id)
  }
}
