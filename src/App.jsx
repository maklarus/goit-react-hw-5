import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation/Navigation';
// import HomePage from './pages/HomePage/HomePage';
// import MoviesPage from './pages/MoviesPage/MoviesPage';
// import MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage';
// import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
// import MovieCast from './components/MovieCast/MovieCast';
// import MovieReviews from './components/MovieReviews/MovieReviews';
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(
  () => import('./pages/MovieDetailsPage/MovieDetailsPage')
);
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'));
const MovieReviews = lazy(
  () => import('./components/MovieReviews/MovieReviews')
);

export default function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<div>Please wait loading page...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast></MovieCast>} />
            <Route path="reviews" element={<MovieReviews></MovieReviews>} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
