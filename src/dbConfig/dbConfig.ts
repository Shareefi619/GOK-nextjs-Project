import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongDB connected Successfully");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error. Please make sure mongodb is connected." + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("something goes wrong");
    console.log(error);
  }
}
