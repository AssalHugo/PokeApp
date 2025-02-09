<script>
import {useCartStore} from '@/stores/cart'
import PokemonCart from "@/components/PokemonCart.vue";

export default {
  name: 'CartView',
  components: {PokemonCart},

  data() {
    return {
      cartStore: useCartStore()
    }
  },
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-center text-gray-800">Your Cart</h1>
    <div v-if="cartStore.count === 0" class="text-center">
      <p>Your cart is empty.</p>
    </div>
    <div v-else>
      <div class="flex flex-wrap">
        <div v-for="pokemon in cartStore.pokemons" :key="pokemon.id" class="w-full md:w-1/2 lg:w-1/4 p-2">
          <PokemonCart :pokemon="pokemon"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>