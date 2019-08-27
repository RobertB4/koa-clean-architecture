import { UseCase } from "./index";

export class UserUseCase extends UseCase {
  async findUserById(): Promise<UserState | null> {
    const { Repositories, ctx } = this;
    return await new Repositories.User(ctx).findUserById();
  }

  async updateUser(): Promise<UserState | null> {
    const { Repositories, ctx } = this;
    return await new Repositories.User(ctx).updateUser(ctx.request.body.user);
  }
}
