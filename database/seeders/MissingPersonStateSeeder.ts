// database/seeders/MissingPersonStateSeeder.ts

import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import StateMissingPerson from 'App/Models/EstadoMissingPerson'
export default class MissingPersonStateSeeder extends BaseSeeder {
  public async run() {
    const name = [
      { name: 'Em busca' },
      { name: 'Encontrada' },
      { name: 'Não encontrada' },
    ]

    await StateMissingPerson.updateOrCreateMany('name', name)
  }
}
