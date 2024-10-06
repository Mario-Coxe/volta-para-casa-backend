import { Location } from 'App/Domain/Enteties/Location'
import { LocationRepository } from 'app/Domain/Repositories/LocationRepository'

export class SearchMunicipeUseCase {
  constructor(private locationRepository: LocationRepository) { }

  async execute(name: string): Promise<Location[]> {
    return this.locationRepository.searchByName(name)
  }
}
