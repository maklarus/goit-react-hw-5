import MovieSearchForm from '../../components/MovieSearchForm/MovieSearchForm';
import { getMoviesByQuery } from '../../moviesApi';
import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import { useSearchParams } from 'react-router-dom';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get('query') ?? '';

  const handleSubmit = newQuery => {
    searchParams.set('query', newQuery);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (searchParam === '') {
      return;
    }
    async function fetchMovies() {
      try {
        setIsLoading(true);
        const data = await getMoviesByQuery(searchParam);
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, [searchParam]);

  return (
    <>
      <MovieSearchForm handleSubmit={handleSubmit} />

      {error && <p>Oops, some error. Please reload!</p>}

      {isLoading && <Loader></Loader>}

      {movies.length > 0 && <MovieList items={movies} />}
    </>
  );
}
