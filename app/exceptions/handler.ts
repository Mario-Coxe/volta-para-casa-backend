/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract) {
    /**
     * Self handle the validation exception
     */

    console.log("error >>>>>>>>>>>>>>>", error)
    if (error.code === "E_VALIDATION_FAILURE") {
      return ctx.response.unprocessableEntity({
        message: error.messages.errors[0].message,
      });
    }



    /**
     * Forward rest of the exceptions to the parent class
     */
    return super.handle(error, ctx);
  }

  async report(error, ctx) {
    //Raven.config(Env.get('SENTRY_DSN'))
    //Raven.captureException(error)
    return super.handle(error, ctx)
  }
}
