<script>
import pokemonCard from "@/components/PokemonCard.vue";
import {watchEffect} from 'vue';
import {getPokemons, request} from "@/services/httpClient.js";

//On initialise la méthode fetchPokemons
export default {
  components: {
    pokemonCard
  },
  data() {
    return {
      loading: false,
      pokemons: [],
      error: null,
      page: 1
    }
  },
  methods: {
    async fetchPokemons(page) {
      this.loading = true;
      try {
        const responsePokemons = await getPokemons(page);

        //Pour chaque pokemon, on récupère les détails
        const promises = responsePokemons.results.map(async (pokemon) => {
          return await request(pokemon.url);
        });

        //On attend que toutes les requêtes soient terminées
        this.pokemons = await Promise.all(promises);
      } catch (e) {
        this.error = e;
      } finally {
        this.loading = false;
      }
    },
    nextPage() {
      this.page++;
      this.fetchPokemons(this.page);
    },
    previousPage() {
      if (this.page > 1) {
        this.page--;
        this.fetchPokemons(this.page);
      }
    }
  },

  created() {
    this.fetchPokemons(this.page);
  }
}
</script>

<template>
  <div>
    <div v-if="loading" class="text-center">
      <p>Chargement...</p>
    </div>
    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-8 gap-4">
        <pokemonCard v-for="pokemon in pokemons" :key="pokemon.id" :pokemon="pokemon"/>
      </div>
      <div class="flex justify-center space-x-4 mt-4">
        <button @click="previousPage()" :disabled="page === 1" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Previous</button>
        <p class="text-gray-700 font-bold">{{ page }}</p>
        <button @click="nextPage()" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Next</button>
        <div v-if="error" class="text-red-500">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>