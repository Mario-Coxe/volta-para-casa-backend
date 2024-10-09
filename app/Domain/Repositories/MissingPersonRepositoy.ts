import { MissingPerson } from '../Enteties/MissingPerson'

export interface MissingPersonRepositoy {
  create(data: Partial<MissingPerson>): Promise<MissingPerson>
  findAll(limit: number, page: number): Promise<MissingPerson[]>
  searchByName(name: string): Promise<MissingPerson[]>
  findById(id: number): Promise<MissingPerson[]>
}
