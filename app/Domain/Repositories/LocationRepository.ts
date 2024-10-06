import { Location } from '../Enteties/Location'
export interface LocationRepository {
  create(data: Partial<Location>): Promise<Location>
  findAll(limit: number, page: number): Promise<Location[]>
  searchByName(name: string): Promise<Location[]>
}
