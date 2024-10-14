// app/Application/UseCases/Municipes/SearchMunicipeUseCase.ts
import { MunicipeRepository } from 'App/Domain/Repositories/MunicipeRepository'
import { MunicipeEntetie } from 'App/Domain/Enteties/Municipe'

export class SearchMunicipeUseCase {
  constructor(private municipeRepository: MunicipeRepository) {}

  async execute(name: string): Promise<MunicipeEntetie[]> {
    return this.municipeRepository.searchByName(name)
  }
}
