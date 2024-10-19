import { ProvinceEntetie } from "App/Domain/Enteties/Province"
import { ProvinceRepository } from "App/Domain/Repositories/ProvinceRepository"

export class GetAllProviceUseCase {
  constructor(private provinceRepository: ProvinceRepository) {}
  async execute(limit: number, page: number): Promise<ProvinceEntetie[]> {
    return this.provinceRepository.findAll(limit, page)
  }
}
