<script setup>
import {RouterLink, RouterView} from 'vue-router'
</script>

<template>
  <header class="bg-gradient-to-r from-red-600 to-blue-400 text-white p-6 shadow-lg">
    <div class="container mx-auto flex justify-between items-center">
      <RouterLink to="/" class="text-2xl font-extrabold tracking-wide hover:underline">
        Pokemon
      </RouterLink>

    </div>
  </header>

  <div class="container mx-auto px-4 mt-8">
    <RouterView/>
  </div>
</template>

<style scoped>
</style>
