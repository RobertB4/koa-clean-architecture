import { Router } from "../types"
import { UserController } from "../controllers"

export function userRoutes(router: Router): void {
  router.get("/user", (ctx): Promise<void> => new UserController(ctx).findUserById())
  router.patch("/user", (ctx): Promise<void> => new UserController(ctx).updateUser())
}
