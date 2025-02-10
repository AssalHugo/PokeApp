<script>
import PokemonCard from "@/components/PokemonCard.vue";
import {getPokemons, request, searchPokemons, getAllTypes, getPokemonByType} from "@/services/httpClient.js";
import SearchBar from "@/components/SearchBar.vue";
import {useCartStore} from "@/stores/cart.js";

export default {
  components: {
    SearchBar,
    PokemonCard
  },
  data() {
    return {
      loading: false,
      pokemons: [],
      totalNumber: 0,
      error: null,
      page: 1,
      cartStore: useCartStore(),
      types: [],
      typeClicked: ""
    }
  },
  methods: {
    viewPokemonDetails(pokemon) {
      this.$router.push({name: 'pokemon-details', params: {id: pokemon.id}});
    },
    visiblePages() {
      const totalPages = Math.ceil(this.totalNumber / 40);
      const pages = [];
      const startPage = Math.max(1, this.page - 4);
      const endPage = Math.min(totalPages, this.page + 4);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      return pages;
    },
    inCart(pokemon) {
      return this.cartStore.pokemons.some(p => p.id === pokemon.id);
    },
    async fetchPokemons(page = 1, search = "") {
      if (this.typeClicked !== "" && search === "") {
        this.searchPokemonsByType(this.typeClicked, page);
        return;
      }
      this.typeClicked = "";
      this.loading = true;
      this.error = null;
      try {
        if (search === "") {
          const responsePokemons = await getPokemons(page);
          this.totalNumber = responsePokemons.count;
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
    changePage(page) {
      this.page = page;
      if (this.typeClicked) {
        this.searchPokemonsByType(this.typeClicked, page);
      } else {
        this.fetchPokemons(page);
      }
    },
    searchPokemons(search) {
      this.page = 1;
      this.fetchPokemons(1, search);
    },
    searchPokemonsByType(type, page = 1) {
      this.typeClicked = type;
      this.page = page;
      this.loading = true;
      this.error = null;
      getPokemonByType(type).then(response => {
        let pokemonsUrl = response.pokemon.map(p => p.pokemon.url);
        const promises = pokemonsUrl.slice((page - 1) * 40, page * 40).map(async (url) => {
          return await request(url);
        });
        Promise.all(promises).then(pokemons => {
          this.pokemons = pokemons;
          this.totalNumber = response.pokemon.length;
          this.loading = false;
        });
      }).catch(e => {
        this.error = e;
        this.loading = false;
      });
    }

  },
  created() {
    this.fetchPokemons();
    getAllTypes().then(response => {
      this.types = response.results;
    });
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
      <div class="flex justify-center space-x-2 mt-4">
        <button v-for="type in types" :key="type.name" @click="searchPokemonsByType(type.name); typeClicked = type.name"
                :class="{'bg-red-600': typeClicked === type.name, 'bg-blue-500': typeClicked !== type.name}"
                class="text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          {{ type.name }}
        </button>
      </div>
      <div v-if="error" class="text-red-500 text-center">{{ error }}</div>
      <div v-if="pokemons" class="grid grid-cols-1 md:grid-cols-8 gap-4">
        <button v-if="pokemons.length === 0" @click="fetchPokemons()"
                class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Reset
        </button>
        <PokemonCard v-for="pokemon in pokemons" :key="pokemon.id" :pokemon="pokemon"
                     @click.native="viewPokemonDetails(pokemon)" :inCart="inCart(pokemon)"/>
      </div>
      <div class="flex justify-center space-x-4 mt-4">
        <div class="flex items-center space-x-2">
          <span>Page {{ page }} of {{ Math.ceil(totalNumber / 40) }}</span>
        </div>
      </div>
      <div class="flex justify-center space-x-2 mt-4">
        <button v-for="page in visiblePages()" :key="page" @click="changePage(page)"
                :class="{'bg-blue-500 text-white': page === this.page, 'bg-gray-200': page !== this.page}"
                class="px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          {{ page }}
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>