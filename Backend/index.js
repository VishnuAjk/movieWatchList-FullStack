import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from 'cors';
import userRouter from "./src/Routes/user.routes.js";
import movieRouter from "./src/Routes/movie.routes.js";
import { connectToDatabase } from "./src/Config/mongoose.js";
import jwtAuth from "./src/Middlewares/jwtAuth.middleware.js";
const app = express();

app.use(express.json());
app.use(cors());

app.use('/user', userRouter);
app.use('/movies',jwtAuth ,movieRouter);



app.listen(3100,()=>{
    console.log("listening at 3100");
    connectToDatabase();
})