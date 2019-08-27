import { verify } from "jsonwebtoken"
import { use } from "koa-passport"
import { Strategy as LocalStrategy } from "passport-local"
import { UserEntity } from "../entities"
import { User } from "../repositories/models/user"
import { HttpStatus } from "../consts"
import { Context, Next } from "../types"

/**
 * Auth middleware
 */

export async function authMiddleware(ctx: Context, next: Next): Promise<void> {
  try {
    if (!ctx.request.headers.authorization) throw new Error("No authoriztion header provided.")
    const token: string = ctx.request.headers.authorization.split("Bearer ")[1]
    if (!token) throw new Error("Invalid authorization header.")
    const decodedToken = verify(token, process.env.JWT_SECRET as string)
    ctx.state.user = decodedToken as Pick<UserEntity, "id" | "email" | "firstName" | "lastName">
    await next()
    return
  } catch (e) {
    console.error(e)
    ctx.status = HttpStatus.unauthorized
    ctx.body = { message: "Unauthorized" }
  }
}

/**
 * Passport strategies
 */

export const signupLocal = "signup/local"
export const loginLocal = "login/local"

use(
  signupLocal,
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done): Promise<void> => {
      try {
        const existingUser = (await User.findOne({ email })) as UserEntity | null
        if (existingUser) throw new Error("This email address is already in use.")
        const user = await User.create({ email, password })
        return done(null, user)
      } catch (e) {
        console.error(e)
        done(e)
      }
    },
  ),
)

use(
  loginLocal,
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done): Promise<void> => {
      try {
        const user = await User.findOne({ email })
        if (user === null) return done(null, false, { message: "Incorrect email" }) // TODO: handle
        if (await user.isPasswordValid(password)) {
          return done(null, user, { message: "Logged in successfully" })
        }
        return done(null, false, { message: "Incorrect password" })
      } catch (e) {
        console.error(e)
        return done(e)
      }
    },
  ),
)
