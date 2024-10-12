import { DateTime } from 'luxon'

export class MissingPersonEntetie {
  constructor(
    public id: number,
    public name: string,
    public age: number,
    public gender: string,
    public last_location: string,
    public registered_by: number,
    public description: string,
    public first_photo: string,
    public status_id?: number,
    public second_photo?: string,
    public third_photo?: string,
    public fourth_photo?: string,
    public createdAt?: DateTime,
    public updatedAt?: DateTime
  ) {}
}
