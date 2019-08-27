import { Router } from "../types"
import { AuthController } from "../controllers"

export function authRoutes(router: Router): void {
  router.post("/login/local", (ctx): void => new AuthController(ctx).loginLocal())
  router.post("/signup/local", (ctx): void => new AuthController(ctx).signupLocal())
}
