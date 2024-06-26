import mongoose from "mongoose";

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connected using mongoose Atlas");
    } catch (err) {
        console.log(err);
    }
}