<template>
  <div class="h-full pt-4 px-4">
    <ChatLayout>
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
              <v-tab value="cast">
                <div class="text-lg">Cast</div>
              </v-tab>
            </v-tabs>
            <v-card-text class="bg-#212121 h-full">
              <v-tabs-window v-model="tab">
                <v-tabs-window-item value="aboutMovie">
                  <AboutMovie />
                </v-tabs-window-item>
                <v-tabs-window-item value="chat">
                  <ActivityChat />
                </v-tabs-window-item>
                <v-tabs-window-item value="cast">
                  Oyuncular
                </v-tabs-window-item>
              </v-tabs-window>
            </v-card-text>
          </v-card>
        </div>
      </template>
    </ChatLayout>
  </div>
</template>
<script lang="ts" setup>
  import ChatLayout from '@/layouts/ChatLayout.vue'
  import ActivityChat from '@/components/Chat/ActivityChat.vue'
  import RandomMovie from '@/components/Movie/RandomMovie.vue'
  import AboutMovie from '@/components/Movie/AboutMovie.vue'
  import { ref } from 'vue'
  const tab = ref('comment')

</script>
<style></style>
