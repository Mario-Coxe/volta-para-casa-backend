// app/Domain/Repositories/MunicipeRepository.ts
import { Municipe } from '../Enteties/Municipe'

export interface MunicipeRepository {
  create(data: Partial<Municipe>): Promise<Municipe>
  findAll(limit: number, page: number): Promise<Municipe[]>
  searchByName(name: string): Promise<Municipe[]>
}
