// app/Domain/Entities/Municipe.ts
import { DateTime } from 'luxon'

export class Municipe {
  constructor(
    public id: number,
    public name: string,
    public provinceId: number,
    public createdAt?: DateTime,
    public updatedAt?: DateTime
  ) { }
}
