import mongoose from "mongoose";
import c from "config";

const mongoURI: string = process.env.MONGODB_URI || c.get("mongoURI")

const db = async () => {
    try {
        await mongoose.connect(mongoURI)
        console.log("DB Connected")
    } catch (e) {
        console.error("Error connecting to DB")
        console.error(e)
        process.exit(1);
    }
}

export default db