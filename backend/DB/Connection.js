import mongoose from "mongoose";

export const connection = async() => {
    try {
        const connectionString = process.env.MONGO_URI;
        console.log("Connection String:", connectionString); // Debug log
        if (!connectionString) {
            throw new Error("Connection string is undefined. Check your .env file.");
        }
        await mongoose.connect(connectionString);
        console.log("Connected to the database");
    } catch (error) {
        console.error("Database connection error:", error.message);
    }
};