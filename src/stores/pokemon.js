import {defineStore} from "pinia";
import {getPokemons, request} from "../services/httpClient";

//On export un store pour stocker les pokemons
export const usePokemonStore = defineStore('pokemons', {

    //On récupère la liste des pokemons
    state: () => ({
        pokemons: [],
        loading: false,
        error: null,
    }),

    //On récupère la liste des pokemons
    actions: {

    },
});