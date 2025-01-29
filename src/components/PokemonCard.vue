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
  <div class="pokemon-card">
    <img class="pokemon-image" :src="pokemon.sprites.front_default" :alt="pokemon.name">
    <div class="pokemon-details">
      <div class="pokemon-name">{{ pokemon.name }}</div>
      <p class="pokemon-price">
        Price: {{ pokemon.base_experience }} €
      </p>
    </div>
    <div class="pokemon-types">
      <span v-for="type in pokemon.types" :key="type.type.name" class="pokemon-type">
        {{ type.type.name }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.pokemon-card {
  max-width: 300px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  background-color: #f9f9f9;
}

.pokemon-card:hover {
  transform: scale(1.05);
}

.pokemon-image {
  width: 100%;
  border-bottom: 1px solid #ddd;
}

.pokemon-details {
  padding: 16px;
}

.pokemon-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.pokemon-price {
  font-size: 1rem;
  color: #666;
}

.pokemon-types {
  padding: 16px;
  border-top: 1px solid #ddd;
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
</style>