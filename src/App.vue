<script setup>
import {RouterLink, RouterView} from 'vue-router'
import {useCartStore} from "@/stores/cart.js";

let cartStore = useCartStore();
</script>

<template>
  <header class="bg-gradient-to-r from-red-600 to-blue-400 text-white p-6 shadow-lg">
    <div class="container mx-auto flex justify-between items-center">
      <RouterLink to="/" class="text-2xl font-extrabold tracking-wide hover:underline">
        PokeApp
      </RouterLink>
      <div class="flex items-center">
        <RouterLink to="/cart/past-orders" class="mr-4">Past Orders</RouterLink>
        <RouterLink to="/cart" class="relative">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m4-9l2 9"></path>
          </svg>
          <span class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">{{ cartStore.count }}</span>
        </RouterLink>
      </div>
    </div>
  </header>

  <div class="container mx-auto px-4 mt-8">
    <RouterView/>
  </div>
</template>

<style scoped>
</style>