import { MunicipeRepository } from 'App/Domain/Repositories/MunicipeRepository'
import { MunicipeEntetie } from 'App/Domain/Enteties/Municipe'

export class FindMunicipeByProvinceIdUseCase {
  constructor(private municipeRepository: MunicipeRepository) {}

  async execute(id: number): Promise<MunicipeEntetie[]> {
    return this.municipeRepository.findMunicipeByProvinceId(id)
  }
}
