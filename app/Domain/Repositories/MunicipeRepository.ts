// app/Domain/Repositories/MunicipeRepository.ts
import { MunicipeEntetie } from '../Enteties/Municipe'

export interface MunicipeRepository {
  create(data: Partial<MunicipeEntetie>): Promise<MunicipeEntetie>
  findAll(limit: number, page: number): Promise<MunicipeEntetie[]>
  findMunicipeByProvinceId(id: number): Promise<MunicipeEntetie[]>
  searchByName(name: string): Promise<MunicipeEntetie[]>
}
