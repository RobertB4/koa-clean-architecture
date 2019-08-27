import { Context } from "../types"
import { AuthController } from "./auth"
import { UserController } from "./user"
import { UseCases, UserUseCase } from "../useCases"

export interface Controllers {
  Auth: typeof AuthController
  User: typeof UserController
}

export abstract class Controller {
  UseCases: UseCases

  constructor(protected ctx: Context) {
    this.UseCases = {
      User: UserUseCase,
    }
  }
}

export { AuthController } from "./auth"
export { UserController } from "./user"
