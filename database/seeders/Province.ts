import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Province from 'App/Models/Province'

export default class extends BaseSeeder {
  public async run() {
    const uniqueKey = 'name'
    await Province.updateOrCreateMany(uniqueKey, [
      {
        name: 'Luanda',
      },
      {
        name: 'Benguela',
      },
      {
        name: 'Cabinda',
      },
      {
        name: 'Bengo',
      },
      {
        name: 'Cuando Cubango',
      },
      {
        name: 'Cuanza Norte',
      },
      {
        name: 'Cuanza Sul',
      },
      {
        name: 'Cunene',
      },
      {
        name: 'Huambo',
      },
      {
        name: 'Huíla',
      },
      {
        name: 'Lunda Norte',
      },
      {
        name: 'Lunda Sul',
      },
      {
        name: 'Malanje',
      },
      {
        name: 'Moxico',
      },
      {
        name: 'Namibe',
      },
      {
        name: 'Uíge',
      },
      {
        name: 'Zaire',
      },
      {
        name: 'Bié'
      },
      {
        name: 'Bié'
      }
    ])
  }
}
