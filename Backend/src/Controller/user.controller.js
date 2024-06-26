import UserRepository from '../Repository/user.repository.js';
import jwt from "jsonwebtoken";

export default class UserController {
    constructor() {
        this.userRepository = new UserRepository();
    }

    signUp = async (req, res) => {
        try {
            const { name, email, password } = req.body;
            console.log(name); 
            const user = await this.userRepository.signUpRepo(name, email, password);
            res.status(201).json({ success: true, user });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    signIn = async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log(req.body);
            const user = await this.userRepository.signInRepo(email, password);
            if (!user || !(await user.comparePassword(password))) {
                return res.status(401).json({ success: false, message: 'Invalid email or password' });
            }
            console.log(user);
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '3h' });

            
            res.status(200).json({ success: true, user, token});

        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }


    getStatus = async(req, res)=>{
        // If the middleware verifies the token, req.user will be available
        if(req.user){
            res.status(200).json({ userInfo: req.user });
        }
        else{
            res.status(401).json({ userInfo: null });
        }
        
    }


}
