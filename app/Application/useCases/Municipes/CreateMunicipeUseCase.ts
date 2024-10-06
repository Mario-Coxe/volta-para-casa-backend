// app/Application/UseCases/Municipes/CreateMunicipeUseCase.ts
import { MunicipeRepository } from 'App/Domain/Repositories/MunicipeRepository'
import { Municipe } from 'App/Domain/Enteties/Municipe'

interface CreateMunicipeRequest {
  name: string
  province_id: string
}

export class CreateMunicipeUseCase {
  constructor(private municipeRepository: MunicipeRepository) { }
  async execute(data: CreateMunicipeRequest): Promise<Municipe> {
    return this.municipeRepository.create(data)
  }
}
