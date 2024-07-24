<template>
  <div class="flex flex-col p-10 px-24">
    <div class="font-bold text-7xl w-full flex justify-end pb-3">
      <div class="text-7xl font-extrabold leading-none tracking-tight text-gray-100">{{ movie.original_title }}</div>
    </div>
    <div class="flex justify-end items-center gap-4">
      <div class="flex flex-row gap-2 items-center">
        <div class="font-bold">Rate:</div>
        <v-rating
          v-model="rating"
          density="comfortable"
          hover
          size="x-small"
          @update:model-value="(value: string | number) => addVote(Number(value))"
        />
        <div class="text-xs">{{ movie.vote_count }} vote</div>
      </div>
      <span class="font-bold">Release date:</span> {{ movie.release_date }}
    </div>
    <div class="flex flex-col gap-4 pt-10">
      <div class="text-3xl font-semibold">Overview</div>
      <div class="text-xl font-extralight">{{ movie.overview }}</div>
    </div>
    <div>d</div>
  </div>
</template>
<script lang="ts" setup>
  import { useMovieStore } from '../../stores/movie'
  import { movieService } from '@/service/movie-service'
  import { computed } from 'vue'
  const movieStore = useMovieStore()
  const movie = computed(() => movieStore.movie)
  const rating = computed(() => movieStore.movie.vote_average / 2)
  const addVote = async (e: number) => {
    await movieService.addRating(movieStore.movie.id, e)
  }
</script>
<style>

</style>
