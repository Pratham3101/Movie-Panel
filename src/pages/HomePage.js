import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularMovies, setCurrentPage } from '../redux/moviesSlice';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import '../styles/HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const { popularMovies, status, error, totalPages, currentPage } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchPopularMovies(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="home-page">
      <div className="movies-grid">
        {popularMovies && popularMovies.length > 0 ? (
          popularMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <Link to={`/movie/${movie.id}`}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <h3>{movie.title}</h3>
              </Link>
              <p>Rating: {movie.vote_average}</p>
            </div>
          ))
        ) : (
          <div>No popular movies found.</div>
        )}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default HomePage;
