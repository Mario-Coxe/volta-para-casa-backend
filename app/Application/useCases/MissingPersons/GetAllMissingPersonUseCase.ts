import { MissingPersonEntetie } from './../../../Domain/Enteties/MissingPerson';
import { MissingPersonRepository } from '../../../Domain/Repositories/MissingPersonRepository';

export class GetAllMissingPersonUseCase {
  constructor(private missingPersonRepository: MissingPersonRepository) {}
  async execute(limit: number, page: number): Promise<MissingPersonEntetie[]> {
    return this.missingPersonRepository.findAll(limit, page)
  }
}
