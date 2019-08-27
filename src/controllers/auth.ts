import { sign } from "jsonwebtoken";
import { authenticate } from "passport";
import { loginLocal, signupLocal } from "../utils/auth";
import { UserEntity } from "../entities";
import { Controller } from "./index";
import { HttpStatus } from "../consts";

export class AuthController extends Controller {
  loginLocal(): void {
    const login = authenticate(loginLocal, { session: false }, (err, user: UserEntity): {
      success: boolean;
    } => {
      if (err || !user) {
        this.ctx.throw(HttpStatus.unauthorized);
        return (this.ctx.body = { success: false });
      } else {
        this.setJwtCookie(user);
        return (this.ctx.body = { success: true });
      }
    });
    return login(this.ctx);
  }

  signupLocal(): void {
    const signup = authenticate(signupLocal, { session: false }, (err, user: UserEntity | null): {
      success: boolean;
    } => {
      if (err || !user) {
        this.ctx.throw(HttpStatus.unauthorized);
        return (this.ctx.body = { success: false });
      }
      this.setJwtCookie(user);
      return (this.ctx.body = { success: true });
    });
    return signup(this.ctx);
  }

  private setJwtCookie(user: UserEntity): void {
    const jwt = sign(user.toClient(), process.env.JWT_SECRET as string);
    this.ctx.cookies.set("apptkn", jwt, {
      httpOnly: false,
      signed: false,
      secure: process.env.NODE_ENV === "development" ? false : true
    });
  }
}
