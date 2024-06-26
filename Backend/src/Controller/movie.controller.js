import MovieRepository from "../Repository/movie.repository.js";

export default class MovieController{

    constructor(){
        this.movieRepository = new MovieRepository();
    }

    add = async(req, res)=>{

        const {title, description, year, genre} = req.body;
        const {userId} = req.user;
        // console.log(req.body)
        // console.log(userId)
     
        try {
            
            const movie = await this.movieRepository.addRepo(title, description, year, genre, userId);
        
            res.status(201).json({ success: true, movie });
            
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }


    get = async(req, res)=>{
        const {userId} = req.user;
        
        try {
            const movies = await this.movieRepository.getRepo(userId);
           
            res.status(200).json({ success: true, movies });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }


    delete = async(req, res)=>{
        const {userId} = req.user;
        const movieId = req.params.movieId;
      
        try {
           await this.movieRepository.deleteRepo(movieId);
           res.status(200).json({ message: 'Movie deleted successfully' });

        } catch (error) {
            res.status(500).json({ message: 'Error deleting movie', error });
        }
    }


    update = async(req, res)=>{
        const movieId = req.params.id;
        const {title, description, year, genre} = req.body;

        try {
            const updatedMovie = await this.movieRepository.updateRepo(movieId,title, description, year, genre);
            if (!updatedMovie) {
                
                return res.status(404).json({ error: 'Movie not found' });
              }
              return res.status(200).json(updatedMovie);
        } catch (error) {
            console.error('Error updating movie:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }


}