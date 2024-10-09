// app/Application/UseCases/Municipes/CreateMunicipeUseCase.ts
import { Location } from 'App/Domain/Enteties/Location'
import { LocationRepository } from 'app/Domain/Repositories/LocationRepository'

interface CreateLocationRequest {
  name: string
  municipe_id: number
  latitude: string
  longitude: string
}

export class CreateLocationUseCase {
  constructor(private locationRepository: LocationRepository) {}
  async execute(data: CreateLocationRequest): Promise<Location> {
    return this.locationRepository.create(data)
  }
}


//CreateMissingPersonUseCase
