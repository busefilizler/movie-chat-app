import { API_KEY, BASE_URL } from './baseURL'
import { responseHandler } from './responseHandler'

const fetchPopularMovies = async (page: number) => {
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
  const response = await fetch(url)
  return responseHandler(response)
}
const addRating = async (movieId: number, rating: number) => {
  const url = `${BASE_URL}/movie/${movieId}/rating?api_key=${API_KEY}`
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ value: rating }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return responseHandler(response)
}
export const movieService = {
  fetchPopularMovies,
  addRating,
}
