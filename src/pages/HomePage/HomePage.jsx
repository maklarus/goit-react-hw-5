import { useState } from 'react';
import { getTrendMovies } from '../../moviesApi';
import { useEffect } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        const data = await getTrendMovies();
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, []);
  return (
    <>
      {error && <p>Oops, some error. Please reload!</p>}

      {isLoading && <Loader></Loader>}

      <MovieList items={movies}></MovieList>
    </>
  );
}
