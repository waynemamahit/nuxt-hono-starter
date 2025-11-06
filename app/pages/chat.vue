<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex column q-pa-md">
        <q-card
          class="q-mb-md"
          style="min-height: 400px; display: flex; flex-direction: column"
        >
          <q-card-section class="col" style="overflow-y: auto">
            <div v-for="(message, index) in messages" :key="index">
              {{ message }}
            </div>
          </q-card-section>
        </q-card>
        <q-form class="flex" @submit="sendMessage">
          <q-input
            v-model="newMessage"
            filled
            dense
            placeholder="Type a message..."
            class="col"
            @keydown.enter.prevent="sendMessage"
          />
          <q-btn type="submit" color="primary" label="Send" class="q-ml-sm" />
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const messages = ref<string[]>([]);
const newMessage = ref('');
let socket: WebSocket | null = null;

onMounted(() => {
  const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const wsUrl = `${wsProtocol}//${window.location.host}/api/chat`;
  socket = new WebSocket(wsUrl);

  socket.addEventListener('message', (event) => {
    messages.value.push(event.data);
  });

  socket.addEventListener('open', () => {
    console.log('WebSocket connection established');
  });

  socket.addEventListener('close', () => {
    console.log('WebSocket connection closed');
  });
});

onUnmounted(() => {
  if (socket) {
    socket.close();
  }
});

const sendMessage = () => {
  if (newMessage.value.trim() !== '' && socket) {
    socket.send(newMessage.value);
    newMessage.value = '';
  }
};
</script>
