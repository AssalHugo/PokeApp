<script>
import { useCartStore } from '@/stores/cart'
export default {
  name: 'CartView',

  data() {
    return {
      cartStore: useCartStore()
    }
  },

  methods: {
    removeFromCart(pokemon) {
      this.cartStore.removePokemon(pokemon)
    }
  }
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-center text-gray-800">Your Cart</h1>
    <div v-if="cartStore.count === 0" class="text-center">
      <p>Your cart is empty.</p>
    </div>
    <div v-else>
      <ul>
        <li v-for="(pokemon, index) in cartStore.getPokemons" :key="index" class="flex items-center justify-between p-4 bg-white rounded-lg shadow-md mb-4">
          <span>{{ pokemon.name }}</span>
          <button @click="removeFromCart(pokemon)" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Remove</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
</style>