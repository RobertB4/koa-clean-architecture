import { Context } from "../types"
import { UserRepository } from "./user"

export interface Repositories {
  User: typeof UserRepository
}

export abstract class Repository {
  constructor(protected ctx: Context) {}
}

export { UserRepository } from "./user"
