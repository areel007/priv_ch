import mongoose from "mongoose";

export const connectDatabase = () => {
  const dbUri = process.env.DB_URI;
  if (!dbUri) {
    console.error("DB_URI environment variable is not defined.");
    return;
  }

  mongoose
    .connect(dbUri)
    .then((con) => {
      console.log(
        `MongoDB Database connected with HOST: ${con.connection.host}`
      );
    })
    .catch((err) => console.log(err));
};
