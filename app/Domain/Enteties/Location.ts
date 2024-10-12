import { DateTime } from 'luxon'

export class LocationEntetie {
  constructor(
    public id: number,
    public name: string,
    public longitude: string,
    public latitude: string,
    public municipe_id: number,
    public createdAt?: DateTime,
    public updatedAt?: DateTime
  ) { }
}
