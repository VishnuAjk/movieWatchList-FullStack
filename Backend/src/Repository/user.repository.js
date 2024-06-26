import {UserModel} from "../Model/UserSchema.js";

export default class UserRepository {
    
    signUpRepo = async (name, email, password) => {
        try {
            // Check if user already exists
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                throw new Error('User already exists');
            }
            // Create a new user
            const newUser = new UserModel({
                name,
                email,
                password,
            });
            console.log(newUser);
            // Save the user to the database
            await newUser.save();
        } catch (error) {
            throw error;
        }
    }

    signInRepo = async(email, password)=>{
        const user = await UserModel.findOne({ email });

          if (!user || !(await user.comparePassword(password))) {
              return null;
          }
         return user;
    }
}
