import express from "express";
import jwtAuth from "../Middlewares/jwtAuth.middleware.js"
import UserController from "../Controller/user.controller.js";
const router = express.Router();
const usersController = new UserController();


router.get('/status',jwtAuth, async(req,res)=>{
    usersController.getStatus(req, res);
})

router.post('/signup', async (req,res)=>{
    usersController.signUp(req,res);
});

router.post('/signin', async (req,res)=>{
    usersController.signIn(req,res);
});

export default router;