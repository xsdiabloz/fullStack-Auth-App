import { model, Schema, Document } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  fullName: string;
  minlength: number;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  fullName: { type: String, required: true },
});

const User = model<IUser>("User", userSchema);

export default User;
