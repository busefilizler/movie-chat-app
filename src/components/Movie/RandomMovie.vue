<template>
  <div class="flex gap-5 flex-col !bg--[#212121]">
    <div class="flex flex-row items-center gap-3">
      <div class="text-3xl">Movie Preview</div>
      <div class="flex items-center">
        <v-icon
          class="cursor-pointer pt-1.5"
          size="24"
          @click="getMovies"
        >mdi-refresh</v-icon>
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
  import { computed, onMounted, ref, watch } from 'vue'
  import { movieService } from '@/service/movie-service'
  import { Movie } from '../../../type.types'
  import { IMG_PATH } from '@/service/baseURL'
  import { useMovieStore } from '@/stores/movie'
  import { useRoute, useRouter } from 'vue-router'

  const router = useRouter()
  const route = useRoute()

  const movieStore = useMovieStore()

  const loading = ref(false)

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

  const posterPath = computed(() => {
    const posterPath = movieStore.movie?.poster_path
    if (!posterPath) {
      return 'https://via.placeholder.com/185x278'
    }
    return IMG_PATH + posterPath
  })

  const getMovies = async () => {
    loading.value = true
    const randomPageNumber = Math.floor(Math.random() * 100) + 1
    const { results } = await movieService.fetchPopularMovies(randomPageNumber)
    router.push({
      path: `/${results[0].id}`,
      query: { movieId: results[0].id },
    })
    movie.value = results[0]
    movieStore.setMovie(results[0])
    localStorage.setItem('movie', JSON.stringify(results[0]))
    loading.value = false
  }
  const routeId = computed(() => Number(route?.params?.id ?? null))

  const getRouteMovies = async () => {
    if (routeId.value) {
      const results = await movieService.getMovieById(Number(routeId.value))
      console.log(results)
      movie.value = {
        adult: false,
        backdrop_path: results.backdrop_path,
        genre_ids: results.genre_ids,
        id: results.id,
        original_language: results.original_language,
        original_title: results.original_title,
        overview: results.overview,
        popularity: results.popularity,
        poster_path: results.poster_path,
        release_date: results.release_date,
        title: results.title,
        video: results.video,
        vote_average: results.vote_average,
        vote_count: results.vote_count,
      }
      movieStore.setMovie(movie.value)
      localStorage.setItem('movie', JSON.stringify(movie.value))
      router.push({
        path: `/${results.id}`,
        query: { movieId: results.id },
      })
    }
  }

  const loadMovieFromLocalStorage = () => {
    const savedMovie = localStorage.getItem('movie')
    const localId = savedMovie ? JSON.parse(savedMovie).movie.id : null
    if (routeId.value) {
      getRouteMovies()
    } else if (localId) {
      if (savedMovie) {
        movie.value = JSON.parse(savedMovie).movie as Movie
      }
    } else {
      getMovies()
    }
  }
  watch(
    () => routeId.value,
    () => {
      console.log('routeId changed')
      getRouteMovies()
    }
  )

  onMounted(() => {
    loadMovieFromLocalStorage()
  })
</script>

<style>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
