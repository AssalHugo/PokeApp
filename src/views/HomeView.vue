<script>
import pokemonCard from "@/components/PokemonCard.vue";
import { getPokemons, request, searchPokemons } from "@/services/httpClient.js";
import SearchBar from "@/components/SearchBar.vue";

export default {
  components: {
    SearchBar,
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
    async fetchPokemons(page = 1, search = "") {
      this.loading = true;
      this.error = null;
      try {
        if (search === "") {
          const responsePokemons = await getPokemons(page);
          const promises = responsePokemons.results.map(async (pokemon) => {
            return await request(pokemon.url);
          });
          this.pokemons = await Promise.all(promises);
        } else {
          this.pokemons = [];
          const response = await searchPokemons(search);
          this.pokemons.push(response);
        }
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
    },
    searchPokemons(search) {
      this.page = 1;
      this.fetchPokemons(1, search);
    },
    viewPokemonDetails(pokemon) {
      this.$router.push({name: 'pokemon-details', params: {id: pokemon.id}});
    }
  },
  created() {
    this.fetchPokemons();
  }
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-center text-gray-800">List of Pokemon</h1>
    <div v-if="loading" class="text-center">
      <p>Loading...</p>
    </div>
    <div v-else>
      <SearchBar @search="searchPokemons"/>
      <div v-if="error" class="text-red-500 text-center">{{ error }}</div>
      <div v-if="pokemons" class="grid grid-cols-1 md:grid-cols-8 gap-4">
        <button v-if="pokemons.length === 0" @click="fetchPokemons()"
                class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Reset
        </button>
        <pokemonCard v-for="pokemon in pokemons" :key="pokemon.id" :pokemon="pokemon"
                     @click.native="viewPokemonDetails(pokemon)"/>
      </div>
      <div class="flex justify-center space-x-4 mt-4">
        <button @click="previousPage()" :disabled="page === 1"
                class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Previous
        </button>
        <p class="text-gray-700 font-bold">{{ page }}</p>
        <button @click="nextPage()"
                class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>