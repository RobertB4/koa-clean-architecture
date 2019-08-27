import { model, Schema, Document, Model } from "mongoose";
import { hash, compare } from "bcryptjs";
import { UserEntity, UserHelpers } from "../../entities";

const userSchema = new Schema<UserEntity>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: String,
  lastName: String
});

userSchema.pre("save", async function(this: UserEntity, next): Promise<void> {
  try {
    const rounds = 10;
    const hashedPassword = await hash(this.password, rounds);
    this.password = hashedPassword;
    next();
  } catch (e) {
    console.error(e);
    next(e);
  }
});

userSchema.methods.isPasswordValid = async function(
  this: UserEntity,
  password: string
): Promise<boolean> {
  try {
    return await compare(password, this.password);
  } catch (e) {
    console.error(e);
    return false;
  }
};

userSchema.method("toClient", function(
  this: UserEntity
): Pick<
  UserEntity,
  Exclude<keyof UserEntity, keyof Document | keyof UserHelpers | "password"> | "id"
> {
  return {
    id: this.id,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName
  };
});

export const User = model<UserEntity, Model<UserEntity, {}>>("User", userSchema);
