import { LocationEntetie } from '../Enteties/Location'
export interface LocationRepository {
  create(data: Partial<LocationEntetie>): Promise<LocationEntetie>
  findAll(limit: number, page: number): Promise<LocationEntetie[]>
  searchByName(name: string): Promise<LocationEntetie[]>
  findById(id: number): Promise<LocationEntetie[]>
}
