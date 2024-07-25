<template>
  <div class="h-full pt-4 px-4">
    <MovieLayout>
      <template #body>
        <RandomMovie />
      </template>
      <template #activity>
        <div class="h-full overflow-y-auto">
          <v-card class="h-full">
            <v-tabs v-model="tab" bg-color="#212121">
              <v-tab value="aboutMovie">
                <div class="text-lg">About Movie</div>
              </v-tab>
              <v-tab value="chat">
                <div class="text-lg">Chat</div>
              </v-tab>
            </v-tabs>
            <v-card-text class="bg-#212121 h-full">
              <v-tabs-window v-model="tab">
                <v-tabs-window-item value="aboutMovie">
                  <img
                    class="-z-10 mask opacity-30 absolute rounded-xl shadow-2xl shadow-gray-500 object-cover"
                    :src="posterPath"
                  >
                  <AboutMovie />
                </v-tabs-window-item>
                <v-tabs-window-item value="chat">
                  <ActivityChat />
                </v-tabs-window-item>
              </v-tabs-window>
            </v-card-text>
          </v-card>
        </div>
      </template>
    </MovieLayout>
  </div>
</template>
<script lang="ts" setup>
  import { useMovieStore } from '../stores/movie'

  import MovieLayout from '@/layouts/MovieLayout.vue'
  import ActivityChat from '@/components/Chat/ActivityChat.vue'
  import RandomMovie from '@/components/Movie/RandomMovie.vue'
  import AboutMovie from '@/components/Movie/AboutMovie.vue'
  import { IMG_PATH } from '@/service/baseURL'
  import { ref } from 'vue'
  const movieStore = useMovieStore()
  const tab = ref('comment')
  const posterPath = computed(() => {
    const posterPath = movieStore.movie?.backdrop_path
    if (!posterPath) {
      return 'https://via.placeholder.com/185x278'
    }
    return IMG_PATH + posterPath
  })
</script>
<style>
.mask {
    -webkit-mask-image: linear-gradient(to top, transparent 70%, #292524 90%);
    mask-image: linear-gradient(to top, transparent 30%, #292524 100%);
  }
</style>
