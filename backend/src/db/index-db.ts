import mongoose from "mongoose";

// DB connect

export const connectDb = (MONGO_URL: string) => {

    mongoose.connect(MONGO_URL);
    const db = mongoose.connection;
    db.on("error", (error) => console.error(error));
    db.once("open", () => console.log("Connected to DB"));
};




