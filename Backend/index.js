import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from 'cors';
import userRouter from "./src/Routes/user.routes.js";
import movieRouter from "./src/Routes/movie.routes.js";
import { connectToDatabase } from "./src/Config/mongoose.js";
import jwtAuth from "./src/Middlewares/jwtAuth.middleware.js";
const app = express();

app.use(cors({
    origin: ["https://movie-watch-list-client.vercel.app"],
    methods:["POST", "GET", "DELETE"],
    credentials:true
}));

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://movie-watch-list-client.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use('/user', userRouter);
app.use('/movies',jwtAuth ,movieRouter);



app.listen(3100,()=>{
    console.log("listening at 3100");
    connectToDatabase();
})
