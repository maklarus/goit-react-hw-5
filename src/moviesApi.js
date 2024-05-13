import axios from 'axios';

const options = {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzUyMWNmYTRkMWIxMzhhMmFiNDQwNzM1NTFmN2UwMyIsInN1YiI6IjY2MzI0M2M3ZDE4NTcyMDEyNTMzY2Y2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WkkdVdVUw2uElsbFPkaZfl_N9kRPrjsOudGYtYdEa_Q',
  },
};

const url = 'https://api.themoviedb.org/3';

export const getTrendMovies = async () => {
  const response = await axios.get(
    `${url}/trending/movie/day?language=en-US/`,
    options
  );
  return response.data.results;
};

export const getMoviesById = async movieId => {
  const response = await axios.get(
    `${url}/movie/${movieId}?language=en-US`,
    options
  );
  return response;
};

export const getMovieCredits = async movieId => {
  const response = await axios.get(
    `${url}/movie/${movieId}/credits?language=en-US`,
    options
  );
  return response;
};

export const getMovieReviews = async movieId => {
  const response = await axios.get(
    `${url}/movie/${movieId}/reviews?language=en-US&page=1`,
    options
  );
  return response;
};

export const getMoviesByQuery = async searchQuery => {
  const response = await axios.get(
    `${url}/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`,
    options
  );

  return response.data.results;
};
