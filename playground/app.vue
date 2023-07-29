<script setup lang="ts">
import { useAuth, useAuthFetch } from '#imports'

const test = async () => {
  const res = await useAuth().signIn({
    email: 'test',
    password: 'test'
  });

  console.log(res);
}

const test2 = () => {
  console.log(useAuthFetch<string>('test', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }));
}
</script>

<template>
  <div>
    Nuxt module playground!
  </div>
  {{ useAuth().isLoggedIn }}
  <button @click="test">test</button>
  <button @click="test2">getState</button>
</template>