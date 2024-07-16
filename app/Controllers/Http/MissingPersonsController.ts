import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MissingPerson from 'App/Models/MissingPerson'
import Application from '@ioc:Adonis/Core/Application'

export default class MissingPersonsController {
  public async store({ request, response, auth }: HttpContextContract) {
    const dataToStore = request.only([
      'name',
      'age',
      'gender',
      'last_location',
      'description',
      'first_photo',
      'second_photo',
      'third_photo',
      'fourth_photo',
      "registered_by"
    ])


    dataToStore.registered_by = auth.user?.id!

    const photos = ['first_photo', 'second_photo', 'third_photo', 'fourth_photo'] as const
    for (const photo of photos) {
      const file = request.file(photo)
      if (file) {
        const fileName = `${Date.now()}-${file.clientName}`
        await file.move(Application.publicPath('uploads'), {
          name: fileName,
          overwrite: true
        })
        dataToStore[photo] = fileName
      }
    }

    const missingPerson = await MissingPerson.create(dataToStore)

    return response.created({ message: 'Criado Com Sucesso', missingPerson })
  }

  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const missingPersons = await MissingPerson.query().preload('user').paginate(page, limit)
    return response.ok(missingPersons)
  }

  public async show({ params, response }: HttpContextContract) {
    const missingPerson = await MissingPerson.findOrFail(params.id)
    await missingPerson.load('user')
    return response.ok(missingPerson)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const missingPerson = await MissingPerson.findOrFail(params.id)

    const dataToUpdate = request.only([
      'name',
      'age',
      'gender',
      'lastLocation',
      'description',
      'first_photo',
      'second_photo',
      'third_photo',
      'fourth_photo'
    ])

    const photos = ['first_photo', 'second_photo', 'third_photo', 'fourth_photo'] as const
    for (const photo of photos) {
      const file = request.file(photo)
      if (file) {
        const fileName = `${Date.now()}-${file.clientName}`
        await file.move(Application.publicPath('uploads'), {
          name: fileName,
          overwrite: true
        })
        dataToUpdate[photo] = fileName
      }
    }
    missingPerson.merge(dataToUpdate)
    await missingPerson.save()

    return response.ok({ message: 'Atualizada Com Sucesso', missingPerson })
  }


  public async destroy({ params, response }: HttpContextContract) {
    const missingPerson = await MissingPerson.findOrFail(params.id)
    await missingPerson.delete()
    return response.ok({ message: 'Pessoa desaparecida excluída com sucesso' })
  }
}
