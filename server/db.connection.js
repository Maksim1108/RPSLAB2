import "dotenv/config"
import mongoose from "mongoose"

export const connectionToDB = () => {
    mongoose.connect(process.env.DB_URL)
        .then(() => console.log("Successful connection to DB"))
        .catch((err) => console.log(err));
}