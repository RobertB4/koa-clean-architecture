import { Controller } from "./index"

export class UserController extends Controller {
  async findUserById(): Promise<void> {
    const { UseCases, ctx } = this
    const user = await new UseCases.User(ctx).findUserById()
    ctx.body = user
  }

  async updateUser(): Promise<void> {
    const { UseCases, ctx } = this
    const user = await new UseCases.User(ctx).updateUser()
    ctx.body = user
  }
}
