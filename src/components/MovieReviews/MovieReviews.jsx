import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../moviesApi';
import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';

export default function MovieReviews() {
  const { movieId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        const response = await getMovieReviews(movieId);
        setReviews(response.data.results);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, [movieId]);

  return (
    <>
      {error && <p>Oops, some error. Please reload!</p>}

      {isLoading ? (
        <Loader />
      ) : reviews.length > 0 ? (
        reviews.map(item => (
          <li key={item.id}>
            <h4>Author: {item.author}</h4>
            <p>{item.content}</p>
          </li>
        ))
      ) : (
        <p>We don&apos;t have any reviews for this movie.</p>
      )}
    </>
  );
}
