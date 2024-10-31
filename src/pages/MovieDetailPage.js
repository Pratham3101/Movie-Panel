import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/MovieDetailPage.css';

const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const movieResponse = await axios.get(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        setMovie(movieResponse.data);

        const castResponse = await axios.get(
          `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
        );
        setCast(castResponse.data.cast);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError('Failed to fetch movie details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!movie) return <div>Movie not found.</div>;

  const formattedDate = new Date(movie.release_date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  return (
    <div className="details-cast-section">
      <div className="details-section">
        <div className="details">
          <div className="bg">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="movie-item"
            />
            <div className="bg-items">
              <h3 className="details-title">{movie.original_title}</h3>
              <p className="details-rating">Rating: {movie.vote_average}</p>
              <h3 className="genres">Genres: {movie.genres.map(genre => genre.name).join(', ')}</h3>
              <p className="details-realise-date">Release Date: {formattedDate}</p>
            </div>
          </div>
          <div className="movie-details">
            <h2 className="overview">Overview:</h2>
            <p className="paragraph">{movie.overview}</p>
          </div>
        </div>

        <div className="background-image">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt="bg-"
            className="item-images"
          />
        </div>
      </div>
      <div className="cast">
        <h2 className="cast-heading">Cast</h2>
        <ul className="cast-list">
          {cast.slice(0, 10).map((actor) => (
            <li key={actor.id} className="cast-item">
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : "/default-profile.jpg" 
                }
                alt={actor.name}
                className="actor-image"
              />
              <div className="actor-details">
                <p className="actor-name">{actor.name}</p>
                <p className="character-name">as {actor.character}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieDetailPage;
