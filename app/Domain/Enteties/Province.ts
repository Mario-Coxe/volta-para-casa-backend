import { DateTime } from 'luxon'

export class ProvinceEntetie {
  constructor(
    public id: number,
    public name: string,
    public createdAt?: DateTime,
    public updatedAt?: DateTime
  ) { }
}
