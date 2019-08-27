import { Context } from "../types"
import { UserUseCase } from "./user"
import { Repositories, UserRepository } from "../repositories"

export interface UseCases {
  User: typeof UserUseCase
}

export abstract class UseCase {
  Repositories: Repositories

  constructor(protected ctx: Context) {
    this.Repositories = {
      User: UserRepository,
    }
  }
}

export { UserUseCase } from "./user"
