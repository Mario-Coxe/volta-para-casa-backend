import { DateTime } from 'luxon'

export class MunicipeEntetie {
  constructor(
    public id: number,
    public name: string,
    public province_id: number,
    public createdAt?: DateTime,
    public updatedAt?: DateTime
  ) { }
}
