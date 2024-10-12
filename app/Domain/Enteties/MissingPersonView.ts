import { DateTime } from 'luxon'

export class MissingPersonViewEntetie {
  constructor(
    public id: number,
    public missing_person_id: number,
    public user_id: number,
    public gender: string,
    public createdAt?: DateTime,
    public updatedAt?: DateTime
  ) {}
}
