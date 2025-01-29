<script>
import PokemonDetails from "@/components/PokemonDetails.vue";

export default {
  name: "PokemonDetailsView",
  components: {
    PokemonDetails
  },
  data() {
    return {
      pokemon: null,
      loading: false,
      error: null
    };
  },
  async created() {
    this.loading = true;
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.$route.params.id}`);
      this.pokemon = await response.json();
    } catch (e) {
      this.error = e;
    } finally {
      this.loading = false;
    }
  }
}
</script>

<template>
  <div>
    <button @click="$router.back()" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Back</button>
    <div v-if="loading" class="text-center">
      <p>Loading...</p>
    </div>
    <div v-else-if="error" class="text-red-500 text-center">
      <p>{{ error }}</p>
    </div>
    <div v-else-if="pokemon">
      <PokemonDetails :pokemon="pokemon" />
    </div>
  </div>
</template>

<style scoped>
</style>