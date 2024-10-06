// app/Application/UseCases/Municipes/SearchMunicipeUseCase.ts
import { MunicipeRepository } from 'App/Domain/Repositories/MunicipeRepository'
import { Municipe } from 'App/Domain/Enteties/Municipe'

export class SearchMunicipeUseCase {
  constructor(private municipeRepository: MunicipeRepository) {}

  async execute(name: string): Promise<Municipe[]> {
    return this.municipeRepository.searchByName(name)
  }
}
