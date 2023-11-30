import mongoose, { Schema, Document } from "mongoose";

// Define the user schema
interface IText extends Document {
  username: string;
  text: string;
}

const textSchema: Schema<IText> = new Schema({
  username: {
    type: String,
  },
  text: {
    type: String,
  },
});

export const Text = mongoose.model<IText>("Text", textSchema);
