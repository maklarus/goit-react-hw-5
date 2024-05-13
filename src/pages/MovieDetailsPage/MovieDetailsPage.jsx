import { Link, useParams, Outlet, useLocation } from 'react-router-dom';
import { getMoviesById } from '../../moviesApi';
import { Suspense, useEffect, useRef, useState } from 'react';
import css from './MovieDetailsPage.module.css';
import Loader from '../../components/Loader/Loader';

export default function MovieDetailsPage() {
  const location = useLocation();

  const { movieId } = useParams();
  const backLinkURL = useRef(location.state ?? '/movies');

  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setisLoading(true);
        const response = await getMoviesById(movieId);
        setMovie(response.data);
      } catch (error) {
        setError(true);
      } finally {
        setisLoading(false);
      }
    }

    fetchMovies();
  }, [movieId]);

  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  return (
    <>
      <Link to={backLinkURL.current} className={css.button}>
        Go back
      </Link>

      {error && <p>Oops, some error. Please reload!</p>}

      {isLoading && <Loader></Loader>}

      {movie && (
        <div>
          <div className={css.title}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : defaultImg
              }
              width={250}
              alt="poster"
            />
            <div className={css.movieDetails}>
              <h1>{movie.title}</h1>
              <p>User Score: {movie.vote_average}</p>
              <h2>Overview</h2>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <ul>
                {movie.genres.map(item => {
                  return <li key={item.id}>{item.name}</li>;
                })}
              </ul>
            </div>
          </div>
          <div className={css.additionalInformation}>
            <p>Additional information</p>
            <ul>
              <li>
                <Link to="cast">Cast</Link>
              </li>
              <li>
                <Link to="reviews">Reviews</Link>
              </li>
            </ul>
          </div>
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
      )}
    </>
  );
}
