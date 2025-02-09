<script>
import { useCartStore } from '@/stores/cart'
export default {
  name: "PokemonCart",
  props: {
    pokemon: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      cartStore: useCartStore(),
      quantity: this.pokemon.quantity
    }
  }
}
</script>

<template>
  <div class="pokemon-cart p-4 bg-white rounded-lg shadow-md">
    <button @click="cartStore.removePokemon(pokemon)"
            class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
      Remove
    </button>
    <img class="pokemon-image w-34 mx-auto" :src="pokemon.sprites.front_default" :alt="pokemon.name">
    <div class="pokemon-details mt-4 text-center">
      <div class="pokemon-name text-lg font-bold">{{ pokemon.name }}</div>
      <input type="number" v-model.number="this.quantity" min="0" class="border rounded px-2 py-1 w-16 text-center">
      <button @click="cartStore.setPokemonQuantity(pokemon, quantity)"
              class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Update Quantity
      </button>
      <p class="pokemon-price text-sm text-gray-600">
        Individual price : {{ pokemon.base_experience }} €
      </p>
      <p class="pokemon-price text-sm text-gray-600">
        Total price : {{ pokemon.base_experience * pokemon.quantity }} €
      </p>
    </div>
    <div class="pokemon-types mt-2 flex justify-center space-x-2">
    <span v-for="type in pokemon.types" :key="type.type.name" class="pokemon-type bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
      {{ type.type.name }}
    </span>
    </div>
  </div></template>
<style scoped>

</style>