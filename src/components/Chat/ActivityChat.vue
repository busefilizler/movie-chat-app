<template>
  <div class="flex flex-col pr-10 overflow-y-auto">
    <div v-if="!showTextField" class="justify-end w-full flex pb-2">
      <div v-if="username" class="capitalize">
        <span class="font-bold pr-1">User:</span><span class="text-sm pr-1">{{ username }}</span>
        <v-icon
          class="cursor-pointer"
          size="14"
          @click="editUserName"
        >mdi-pencil</v-icon>
      </div>
    </div>
    <div
      v-if="showUserNameNotification"
      class="flex items-center gap-3 pb-10 pt-2 text-lg"
    >
      <div class="">Please enter your username to log in to chat.</div>
      <v-icon
        class="cursor-pointer"
        size="20"
        @click="showTextField = true"
      >mdi-pencil</v-icon>
    </div>

    <v-text-field
      v-if="showTextField"
      v-model="username"
      class="pb-10 w-56"
      hide-details
      placeholder="Add a username"
      variant="underlined"
    >
      <template #append-inner>
        <v-icon
          class="cursor-pointer"
          @click="addUserName"
        >mdi-subdirectory-arrow-right</v-icon>
      </template>
    </v-text-field>
    <v-text-field
      v-if="username && !showTextField"
      v-model="message"
      placeholder="Write a message..."
      variant="outlined"
      @keydown.enter="sendComment"
    >
      <template #append-inner>
        <v-btn icon @click="sendComment">
          <v-icon color="#eab308">mdi-send</v-icon>
        </v-btn>
      </template>
    </v-text-field>

    <div
      v-if="chatResponse.length"
      :key="roomId"
      class="flex flex-col gap-4 h-[30em] overflow-y-auto border p-4"
    >
      <div v-for="mes in chatResponse" :key="mes.id" class="flex">
        <MessageComponent :message="mes" />
      </div>
    </div>
  </div>
</template>
<script lang="tsx" setup>
  import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
  import { ChatMessage } from '../../../type.types'
  import { VAvatar, VBtn } from 'vuetify/components'
  import { io, Socket } from 'socket.io-client'
  import { useMovieStore } from '@/stores/movie'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const movieStore = useMovieStore()
  const message = ref('')
  const username = ref('')
  const chatResponse = ref<ChatMessage[]>([])
  const showTextField = ref(false)
  let socket: Socket
  // @ts-ignore
  const roomId = ref(route.params.id as string)

  const showUserNameNotification = computed(() => {
    return !username.value && !showTextField.value
  })

  const addUserName = () => {
    localStorage.setItem('username', username.value)
    showTextField.value = false
  }

  const sendComment = async () => {
    message.value = message.value.trim()
    if (!message.value) return
    socket.emit('message', {
      message: message.value,
      date: new Date().toISOString(),
      username: username.value,
      movieName: movieStore.movie.original_title,
    })
    message.value = ''
  }

  const setSocketMessage = (data: ChatMessage) => {
    chatResponse.value = [data, ...chatResponse.value]
    localStorage.setItem('chatMessage', JSON.stringify(chatResponse.value))
  }

  const getInitChatMessage = () => {
    const chatMessage = localStorage.getItem('chatMessage')
    if (chatMessage) {
      chatResponse.value = JSON.parse(chatMessage)
    }
  }

  const getUserNameInLocalStorage = () => {
    const user = localStorage.getItem('username')
    if (user) {
      username.value = user
      showTextField.value = false
    }
  }

  const connectSocket = () => {
    if (socket) {
      socket.disconnect()
    }
    const domain = window.location.hostname
    const port = import.meta.env.VITE_SOCKET_PORT
    console.log(domain)
    socket = io(`${domain}:${port}`, {
      query: { roomId: roomId.value },
    })

    socket.on('message', (data: ChatMessage) => {
      setSocketMessage(data)
    })
  }

  onMounted(() => {
    getInitChatMessage()
    getUserNameInLocalStorage()
    connectSocket()
  })

  watch(
    // @ts-ignore
    () => route.params.id,
    (newId, oldId) => {
      if (newId !== oldId) {
        roomId.value = newId as string
        localStorage.removeItem('chatMessage')
        chatResponse.value = []
        connectSocket()
      }
    }
  )

  const getInitials = (username: string) => {
    return username
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
  }

  const editUserName = () => {
    showTextField.value = true
  }

  onBeforeUnmount(() => {
    if (socket) {
      socket.disconnect()
    }
  })

  const MessageComponent = ({ message }: { message: ChatMessage }) => {
    return (
    <div class="flex gap-3 items-center">
      <VAvatar>
        <span class="text-lg text-yellow-500 font-black">
          {getInitials(message.username)}
        </span>
      </VAvatar>
      <div class="flex flex-col">
        <div class="font-bold capitalize text-base">
          {message.username} -{' '}
          <span class="text-xs font-thin">
            <span class="font-light">{message.movieName}</span> movie is being
            examined.
          </span>
        </div>
        <div class="font-thin text-base">{message.message}</div>
      </div>
    </div>
    )
  }
</script>
