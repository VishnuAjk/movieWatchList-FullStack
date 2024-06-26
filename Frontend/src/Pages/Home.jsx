import React, { useEffect } from 'react'
import MovieCard from '../Components/MovieCard.jsx';
import styles from '../styles/home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {deleteMovie, getMovies, movieSelector } from '../Redux/Reducers/movieSlice.js';
import { useNavigate } from 'react-router-dom';



const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movies } = useSelector(movieSelector);

  
  useEffect(()=>{
    dispatch(getMovies());
  },[movies]);


  const handleDelete = (movieId)=>{

    dispatch(deleteMovie(movieId));

  }

  const handleUpdate = (movie)=>{
    navigate(`/movies/update/${movie._id}`);
  }

  const handleDetails = (movieId)=>{
    navigate(`/movies/movieDetails/${movieId}`);
  }


  return (
    <div className={styles.container}>
      <h1>WatchList</h1>
      <div className={styles.movieList}>
        {movies.map((movie, index) => (
          <div className={styles.cardContainer} onClick={()=>handleDetails(movie._id)}>
            <MovieCard 
              key={index}
              id={movie._id}
              title={movie.title}
              description={movie.description}
              year={movie.year}
              genre={movie.genre}
              handleDelete={handleDelete}
              handleUpdate={()=>handleUpdate(movie)}
              
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
