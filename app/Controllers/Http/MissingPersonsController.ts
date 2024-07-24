import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MissingPerson from 'App/Models/MissingPerson'
import Application from '@ioc:Adonis/Core/Application'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import MissingPersonView from 'App/Models/MissingPersonView'
import Database from '@ioc:Adonis/Lucid/Database'
import MissingPersonFollower from 'App/Models/MissingPersonFollower'
import Ws from 'App/Services/Ws'

export default class MissingPersonsController {
  public async store({ request, response, auth }: HttpContextContract) {
    const validationSchema = schema.create({
      name: schema.string({}, [rules.maxLength(255)]),
      age: schema.number([rules.range(0, 120)]),
      gender: schema.string({}, [rules.maxLength(50)]),
      last_location: schema.string({}, [rules.maxLength(255)]),
      description: schema.string.optional({}, [rules.maxLength(1000)]),
    })

    const validatedData = await request.validate({ schema: validationSchema })

    const dataToStore = {
      ...validatedData,
      registered_by: auth.user?.id!,
    }

    const photos = ['first_photo', 'second_photo', 'third_photo', 'fourth_photo'] as const
    for (const photo of photos) {
      const file = request.file(photo)
      if (file) {
        const fileName = `${Date.now()}-${file.clientName}`
        await file.move(Application.publicPath('uploads'), {
          name: fileName,
          overwrite: true,
        })
        dataToStore[photo] = fileName
      }
    }
    const missingPerson = await MissingPerson.create(dataToStore)

    return response.created({ message: 'Criado com sucesso', missingPerson })
  }

  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const missingPersons = await MissingPerson.query()
      .preload('user')
      .preload('status')
      .orderBy('created_at', 'desc')
      .paginate(page, limit)

    return response.ok(missingPersons)
  }

  public async show({ params, response, auth }: HttpContextContract) {
    try {
      const missingPerson = await MissingPerson.query()
        .where('id', params.id)
        .preload('user')
        .preload('status')
        .firstOrFail()

      if (auth.user) {
        const existingView = await MissingPersonView.query()
          .where('missing_person_id', missingPerson.id)
          .andWhere('user_id', auth.user.id)
          .first()

        if (!existingView) {
          await MissingPersonView.create({
            missingPersonId: missingPerson.id,
            userId: auth.user.id,
          })
        }
      }

      const viewCount = await Database
        .from('missing_person_views')
        .where('missing_person_id', missingPerson.id)
        .count('* as total')

      return response.ok({ missingPerson, viewCount: viewCount[0].total })
    } catch (error) {
      return response.notFound({ message: 'Pessoa desaparecida não encontrada' })
    }
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
      'fourth_photo',
    ])

    const photos = ['first_photo', 'second_photo', 'third_photo', 'fourth_photo'] as const
    for (const photo of photos) {
      const file = request.file(photo)
      if (file) {
        const fileName = `${Date.now()}-${file.clientName}`
        await file.move(Application.publicPath('uploads'), {
          name: fileName,
          overwrite: true,
        })
        dataToUpdate[photo] = fileName
      }
    }
    missingPerson.merge(dataToUpdate)
    await missingPerson.save()

    return response.ok({ message: 'Actualizado Com Sucesso', missingPerson })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const missingPerson = await MissingPerson.findOrFail(params.id)
    await missingPerson.delete()
    return response.ok({ message: 'Pessoa desaparecida excluída com sucesso' })
  }


  public async follow({ params, auth, response }: HttpContextContract) {
    const existingFollower = await MissingPersonFollower.query()
      .where('missing_person_id', params.id)
      .andWhere('user_id', auth.user!.id)
      .first()

    if (existingFollower) {
      return response.ok({ message: 'Já está em observação' })
    }

    await MissingPersonFollower.create({
      missingPersonId: params.id,
      userId: auth.user!.id,
    })

    const missingPerson = await MissingPerson.findOrFail(params.id)

    Ws.io.emit('new:invitation', {
      message: `${auth.user?.full_name} está seguindo o caso de ${missingPerson.name}`
    })

    return response.ok({ message: 'Seguindo com sucesso' })
  }

  public async unfollow({ params, auth, response }: HttpContextContract) {
    const follower = await MissingPersonFollower.query()
      .where('missing_person_id', params.id)
      .andWhere('user_id', auth.user!.id)
      .firstOrFail()

    await follower.delete()

    return response.ok({ message: 'Deixou de seguir' })
  }
}
