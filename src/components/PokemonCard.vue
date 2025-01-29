<script>
export default {
  name: "PokemonCard",
  props: {
    pokemon: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white">
    <img class="w-full" :src="pokemon.sprites.front_default" :alt="pokemon.name">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ pokemon.name }}</div>
      <p class="text-gray-700 text-base">
        Price: {{ pokemon.base_experience }} €
      </p>
    </div>
    <div class="px-6 pt-4 pb-2">
      <span v-for="type in pokemon.types" :key="type.type.name" class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
        {{ type.type.name }}
      </span>
    </div>
  </div>
</template>

<style scoped>
</style>