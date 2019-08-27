import { Repository } from "./index";
import { User } from "./models";
import { HttpStatus } from "../consts";

export class UserRepository extends Repository {
  async findUserById(): Promise<UserState | null> {
    const { ctx } = this;
    try {
      const user = await User.findById(ctx.state.user.id);
      if (user) return user.toClient();
      return null;
    } catch (e) {
      console.error(e);
      ctx.status = HttpStatus.badRequest;
      return null;
    }
  }

  async updateUser(updatedUser: UserState): Promise<UserState | null> {
    const { ctx } = this;
    try {
      const user = await User.findOneAndUpdate({ _id: ctx.state.user.id }, updatedUser);
      if (user) return user.toClient();
      return null;
    } catch (e) {
      console.error(e);
      ctx.status = HttpStatus.badRequest;
      return null;
    }
  }
}
