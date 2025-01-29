<script>
export default {
  name: "PokemonDetails",
  props: {
    pokemon: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <div v-if="pokemon" class="pokemon-details space-y-4 p-4 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold text-center">{{ pokemon.name }}</h1>
    <img :src="pokemon.sprites.front_default" :alt="pokemon.name" class="mx-auto">
    <p class="text-center">Height: {{ pokemon.height }}</p>
    <p class="text-center">Weight: {{ pokemon.weight }}</p>
    <p class="text-center">Base experience: {{ pokemon.base_experience }}</p>
    <div class="pokemon-types text-center">
      <span v-for="type in pokemon.types" :key="type.type.name" class="pokemon-type">
        {{ type.type.name }}
      </span>
    </div>
    <div class="pokemon-stats">
      <h2 class="text-xl font-semibold">Stats</h2>
      <ul>
        <li v-for="stat in pokemon.stats" :key="stat.stat.name">
          {{ stat.stat.name }}: {{ stat.base_stat }}
        </li>
      </ul>
    </div>
    <div class="pokemon-abilities">
      <h2 class="text-xl font-semibold">Abilities</h2>
      <ul>
        <li v-for="ability in pokemon.abilities" :key="ability.ability.name">
          {{ ability.ability.name }}
        </li>
      </ul>
    </div>
    <div class="pokemon-moves">
      <h2 class="text-xl font-semibold">Moves</h2>
      <ul>
        <li v-for="move in pokemon.moves.slice(0, 5)" :key="move.move.name">
          {{ move.move.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.pokemon-details {
  max-width: 400px;
  margin: auto;
  background-color: #f9f9f9;
}

.pokemon-type {
  display: inline-block;
  background-color: #e0e0e0;
  border-radius: 12px;
  padding: 5px 10px;
  margin: 4px;
  font-size: 0.875rem;
  color: #555;
}

.pokemon-stats, .pokemon-abilities, .pokemon-moves {
  margin-top: 16px;
}

.pokemon-stats ul, .pokemon-abilities ul, .pokemon-moves ul {
  list-style-type: none;
  padding: 0;
}

.pokemon-stats li, .pokemon-abilities li, .pokemon-moves li {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 8px;
}
</style>