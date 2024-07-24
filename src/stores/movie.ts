// stores/movieStore.ts
import { defineStore } from 'pinia'
import { Movie } from '../../type.types'

export const useMovieStore = defineStore('movie', {
  state: () => ({
    movie: {
      adult: false,
      backdrop_path: '',
      genre_ids: [],
      id: 0,
      original_language: '',
      original_title: '',
      overview: '',
      popularity: 0,
      poster_path: '',
      release_date: '',
      title: '',
      video: false,
      vote_average: 0,
      vote_count: 0,
    } as Movie,
  }),
  actions: {
    setMovie (newMovie: Movie) {
      this.movie = newMovie
    },
  },
})
