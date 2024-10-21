import { MunicipeRepository } from 'App/Domain/Repositories/MunicipeRepository'
import { MunicipeEntetie } from 'App/Domain/Enteties/Municipe'

interface CreateMunicipeRequest {
  name: string
  province_id: number
}

export class CreateMunicipeUseCase {
  constructor(private municipeRepository: MunicipeRepository) { }
  async execute(data: CreateMunicipeRequest): Promise<MunicipeEntetie> {
    return this.municipeRepository.create(data)
  }
}
