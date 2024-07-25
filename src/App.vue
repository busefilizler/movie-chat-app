<template>
  <v-app class="!bg-[#212121] text-white h-screen !font-sans">
    <v-main>
      <AppHeader />
      <RouterView />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import AppHeader from './components/Header/AppHeader.vue'
</script>
