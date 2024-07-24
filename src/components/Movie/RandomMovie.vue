<template>
  <div class="flex gap-5 flex-col !bg--[#212121]">
    <div class="flex flex-row items-center gap-3">
      <div class="text-3xl">Movie Preview</div>
      <div class="flex items-center">
        <v-icon class="cursor-pointer pt-1.5" size="24" @click="refreshMovies">mdi-refresh</v-icon>
        <div v-if="loading" class="ml-3">
          <v-icon class="animate-spin" size="24">mdi-loading</v-icon>
        </div>
      </div>
    </div>
    <img
      class="w-[80%] h-full rounded-xl shadow-2xl shadow-gray-500"
      :src="posterPath"
    >
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref } from 'vue'
  import { movieService } from '@/service/movie-service'
  import { Movie } from '../../../type.types'
  import { IMG_PATH } from '@/service/baseURL'
  import { useMovieStore } from '@/stores/movie'

  const movieStore = useMovieStore()
  const movie = ref<Movie>({
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
  })

  const loading = ref(false)

  const posterPath = computed(() => {
    const posterPath = movie.value?.poster_path
    if (!posterPath) {
      return 'https://via.placeholder.com/185x278'
    }
    return IMG_PATH + posterPath
  })

  const getMovies = async () => {
    loading.value = true
    const randomPageNumber = Math.floor(Math.random() * 100) + 1
    const { results } = await movieService.fetchPopularMovies(randomPageNumber)
    movie.value = results[0]
    movieStore.setMovie(results[0])
    localStorage.setItem('movie', JSON.stringify(results[0]))
    loading.value = false
  }

  const loadMovieFromLocalStorage = () => {
    const savedMovie = localStorage.getItem('movie')
    if (savedMovie) {
      movie.value = JSON.parse(savedMovie).movie as Movie
    } else {
      getMovies()
    }
  }

  const refreshMovies = () => {
    getMovies()
  }

  onMounted(() => {
    loadMovieFromLocalStorage()
  })
</script>

<style>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
