import MissingPersonView from "App/Models/MissingPersonView"

export class MissingPersonViewRepository {
  public async findByPersonAndUser(missingPersonId: number, userId: number): Promise<MissingPersonView | null> {
    return await MissingPersonView.query()
      .where('missing_person_id', missingPersonId)
      .andWhere('user_id', userId)
      .first()
  }

  public async createView(missingPersonId: number, userId: number): Promise<void> {
    await MissingPersonView.create({
      missingPersonId,
      userId,
    })
  }

  public async countViewsByMissingPerson(missingPersonId: number): Promise<number> {
    const result = await MissingPersonView.query()
      .where('missing_person_id', missingPersonId)
      .count('* as total')

    return result[0].$extras.total
  }
}
