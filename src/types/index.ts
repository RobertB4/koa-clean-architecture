import * as Koa from "koa"
import * as KoaRouter from "koa-router"
import { Document } from "mongoose"
import { UserEntity, UserHelpers } from "../entities"

export interface ContextState {
  _passport: any // TODO: type
  user: Pick<UserEntity, Exclude<keyof UserEntity, keyof Document | keyof UserHelpers | "password"> | "id">
}

export interface CustomContext {}

export interface App extends Koa<ContextState, CustomContext> {}

export interface Router extends KoaRouter<ContextState, CustomContext> {}

export interface Context extends Koa.ParameterizedContext<ContextState, CustomContext> {}

export type Next = () => Promise<any>
