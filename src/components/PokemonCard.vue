<script>
export default {
  name: "PokemonCard",
  props: {
    pokemon: {
      type: Object,
      required: true
    },
    inCart: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<template>
  <div v-inCart="inCart" class="pokemon-card p-4 bg-white rounded-lg shadow-md cursor-pointer">
    <h1 v-if="inCart" class="text-right text-red-500 text-sm font-semibold text-xl">In Cart</h1>
    <img class="pokemon-image w-44 mx-auto" :src="pokemon.sprites.front_default" :alt="pokemon.name">
    <div class="pokemon-details mt-4 text-center">
      <div class="pokemon-name text-lg font-bold">{{ pokemon.name }}</div>
      <div class="pokemon-quantity text-sm text-gray-600">
        Quantity: {{ pokemon.quantity }}
      </div>
      <p class="pokemon-price text-sm text-gray-600">
        Price: {{ pokemon.base_experience }} €
      </p>
    </div>
    <div class="pokemon-types mt-2 flex justify-center space-x-2">
      <span v-for="type in pokemon.types" :key="type.type.name" class="pokemon-type bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
        {{ type.type.name }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.pokemon-card {
  transition: transform 0.3s, box-shadow 0.3s;
}
.pokemon-card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
</style>