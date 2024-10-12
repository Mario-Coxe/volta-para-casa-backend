import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MissingPerson from 'App/Models/MissingPerson'
import Application from '@ioc:Adonis/Core/Application'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import MissingPersonView from 'App/Models/MissingPersonView'
import Database from '@ioc:Adonis/Lucid/Database'
import MissingPersonFollower from 'App/Models/MissingPersonFollower'
import Ws from 'App/Services/Ws'

import { CreateMissingPersonUseCase } from 'App/Application/useCases/MissingPersons/CreateMissingPersonUseCase'
import { MissingPersonRepositoryImpl } from '../Repositories/MissingPersonRepositoryImpl'
import { GetAllMissingPersonUseCase } from 'App/Application/useCases/MissingPersons/GetAllMissingPersonUseCase'


export default class MissingPersonsController {
  private createMissingPersonUseCase: CreateMissingPersonUseCase
  private missingPersonRepository: MissingPersonRepositoryImpl


  constructor() {
    const missingPersonRepository = new MissingPersonRepositoryImpl()
    this.missingPersonRepository = new MissingPersonRepositoryImpl()
    this.createMissingPersonUseCase = new CreateMissingPersonUseCase(missingPersonRepository)
  }

  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const data = request.only(['name', 'age', 'gender', 'last_location', 'description'])
      const dataToStore = {
        ...data,
        first_photo: '',
        second_photo: '',
        third_photo: '',
        fourth_photo: '',
        registered_by: auth.user?.id!,
      }
      const photos = ['first_photo', 'second_photo', 'third_photo', 'fourth_photo'] as const
      for (const photo of photos) {
        const file = request.file(photo)
        if (file) {
          const fileName = `${Date.now()}-${file.clientName}`
          await file.move(Application.tmpPath('uploads'), {
            name: fileName,
            overwrite: true,
          })

          if (file.errors && file.errors.length > 0) {
            return response.status(400).json({ error: `Erro ao mover o arquivo ${photo}` })
          }
          dataToStore[photo] = fileName
        }
      }

      const missingPerson = await this.createMissingPersonUseCase.execute(dataToStore)

      return response.created({ message: 'Criado com sucesso', missingPerson })
    } catch (error) {
      console.error('Erro ao criar pessoa desaparecida:', error)
      return response.status(500).json({ error: 'Erro interno do servidor' })
    }
  }


  public async index({ request, response }: HttpContextContract) {
    const getAllMissingPersonUseCase = new GetAllMissingPersonUseCase(this.missingPersonRepository)
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const data = await getAllMissingPersonUseCase.execute(limit, page)
    return response.ok(data)
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

      const viewCount = await Database.from('missing_person_views')
        .where('missing_person_id', missingPerson.id)
        .count('* as total')

      return response.ok({ missingPerson, viewCount: viewCount[0].total })
    } catch (error) {
      return response.notFound({ message: 'Pessoa desaparecida não encontrada' })
    }
  }

  public async update({ params, request, response, auth }: HttpContextContract) {
    try {
      const userId = auth.user?.id
      const missingPerson = await MissingPerson.findOrFail(params.id)

      if (missingPerson.registered_by !== userId) {
        return response.forbidden({
          message: 'Você não tem permissão para atualizar este registro.',
        })
      }

      const dataToUpdate = request.all()

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

      return response.ok({ message: 'Atualizado com sucesso', missingPerson })
    } catch (error) {
      return response.internalServerError({
        message: 'Ocorreu um erro ao tentar atualizar o registro.',
        error: error.message,
      })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const missingPerson = await MissingPerson.findOrFail(params.id)
    await missingPerson.delete()
    return response.ok({ message: 'Pessoa desaparecida excluída com sucesso' })
  }

  /*

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
      message: `${auth.user?.full_name} está seguindo o caso de ${missingPerson.name}`,
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

  */
}
