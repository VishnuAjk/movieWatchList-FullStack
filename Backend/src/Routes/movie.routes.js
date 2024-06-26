import express from "express";
import MovieController from "../Controller/movie.controller.js";
const router = express.Router();
const movieController = new MovieController();


router.get("/get", async(req, res)=>{
    movieController.get(req, res);
})

router.post("/add", async(req, res)=> {
    movieController.add(req, res);
});

router.delete("/delete/:movieId", async(req, res)=>{
    movieController.delete(req, res);
})

router.put("/update/:id", async(req, res)=>{
    movieController.update(req, res);
})




export default router;