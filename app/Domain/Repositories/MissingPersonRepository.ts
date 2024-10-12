import { MissingPersonEntetie } from '../Enteties/MissingPerson'
import MissingPersonView from 'App/Models/MissingPersonView'

export interface MissingPersonRepository {
  create(data: Partial<MissingPersonEntetie>): Promise<MissingPersonEntetie>
  findAll(limit: number, page: number, sortBy: string, sortDirection: string): Promise<MissingPersonEntetie[]>
  searchByName(name: string): Promise<MissingPersonEntetie[]>
  findById(id: number): Promise<MissingPersonEntetie>
  view(id: number): Promise<MissingPersonView[]>
}
