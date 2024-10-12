// app/Application/UseCases/Municipes/GetAllMunicipesUseCase.ts
import { MunicipeEntetie } from 'App/Domain/Enteties/Municipe'
import { MunicipeRepository } from 'App/Domain/Repositories/MunicipeRepository'

export class GetAllMunicipesUseCase {
  constructor(private municipeRepository: MunicipeRepository) {}

  async execute(limit: number, page: number): Promise<MunicipeEntetie[]> {
    return this.municipeRepository.findAll(limit, page)
  }
}
