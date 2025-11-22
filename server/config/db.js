import mongoose from "mongoose";
export const connectDB = () => {
    try {
        mongoose.connect(process.env.MONGO_URL)
        console.log("Database connected successfully!");

    } catch (error) {
        console.log("Database connected error:!", error.message);
        process.exit(1);

    }
}