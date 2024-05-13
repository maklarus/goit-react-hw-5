import { useParams } from 'react-router-dom';
import { getMovieCredits } from '../../moviesApi';
import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';

export default function MovieCast() {
  const { movieId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        const response = await getMovieCredits(movieId);
        setMovie(response.data.cast);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, [movieId]);

  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  return (
    <>
      {error && <p>Oops, some error. Please reload!</p>}

      {isLoading && <Loader></Loader>}

      {!isLoading && movie && (
        <div>
          {movie.map(item => {
            return (
              <div key={item.id}>
                <img
                  src={
                    item.profile_path
                      ? `https://image.tmdb.org/t/p/w500/${item.profile_path}`
                      : defaultImg
                  }
                  width={250}
                  alt="poster"
                />
                <ul>
                  <li>{item.name}</li>
                  <li>Character: {item.character}</li>
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
