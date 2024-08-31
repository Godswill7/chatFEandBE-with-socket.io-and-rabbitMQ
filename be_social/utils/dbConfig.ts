import mongoose from "mongoose";

const URL: string = "mongodb://127.0.0.1:27017/ssDB";
export const mianDBConfig = async () => {
  try {
    await mongoose.connect(URL).then(() => {
      console.log("DB connected...🚀🚀🚀");
    });
  } catch (error) {
    console.log(error);
  }
};
