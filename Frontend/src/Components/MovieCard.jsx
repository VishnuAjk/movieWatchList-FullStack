import React from 'react';
import styles from '../styles/movieCard.module.css';


const MovieCard = ({id, title, description, year, genre, handleDelete, handleUpdate }) => {

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  return (
    <div className={styles.card}>
      <h2>{title}</h2>
      <p className={styles.description}>{description}</p>
      <p><strong>Year:</strong> {year}</p>
      <p><strong>Genre:</strong> {genre}</p>
      <div className={styles.btnContainer}>
      <button onClick={(event) => { stopPropagation(event); handleUpdate(); }}>Update</button>
      <button onClick={(event) => { stopPropagation(event); handleDelete(id); }}>Delete</button>
      </div>
    </div>
  );
};

export default MovieCard;
