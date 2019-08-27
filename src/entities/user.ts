import { Document } from "mongoose"

export interface UserEntity extends Document, UserHelpers {
  id: string
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface UserHelpers {
  isPasswordValid: (password: string) => Promise<boolean>
  toClient: () => Pick<
    UserEntity,
    Exclude<keyof UserEntity, keyof Document | keyof UserHelpers | "password"> | "id"
  >
}
