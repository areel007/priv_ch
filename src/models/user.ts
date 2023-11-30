import mongoose, { Schema, Document } from "mongoose";

// Define the user schema
interface IUser extends Document {
  username: string;
}

const userSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
});

export const User = mongoose.model<IUser>("User", userSchema);
