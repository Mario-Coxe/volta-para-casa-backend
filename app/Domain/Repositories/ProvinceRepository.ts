import { ProvinceEntetie } from '../Enteties/Province'

export interface ProvinceRepository {
  findAll(limit: number, page: number): Promise<ProvinceEntetie[]>
}
