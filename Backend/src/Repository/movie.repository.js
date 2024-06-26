import { MovieModel } from "../Model/MovieSchema.js";

export default class MovieRepository{

    
    addRepo = async (title, description, year, genre, userId)=>{

        try {
            const newMovie = new MovieModel({
                title, 
                description, 
                year, 
                genre,
                userId
            })

            // console.log(newMovie);
            
            await newMovie.save();
            return newMovie;
            
        } catch (error) {
            throw error;
        }
    }

    getRepo = async(userId)=>{
        try {
            const movies = await MovieModel.find({userId});
            return movies;
        } catch (error) {
            throw error;
        }
    }


    deleteRepo = async(movieId)=>{
        try {
            const movie = await MovieModel.findByIdAndDelete(movieId);
            // console.log(movie);
            return;
        } catch (error) {
            throw error;
        }
    }


    updateRepo = async(movieId,title, description, year, genre)=>{
        try {
            
            const updateMovie = await MovieModel.findByIdAndUpdate(movieId, {
                title, description, year, genre
              }, { new: true });

            return updateMovie;
        } catch (error) {
            throw error;
        }
    }
}