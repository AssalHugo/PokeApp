import {defineStore} from "pinia";

//On export un store pour stocker les pokemons
export const useCartStore = defineStore('cart', {

    //On récupère la liste des pokemons
    state: () => ({
        pokemons: [],
    }),

    //On ajoute un pokemon au cart
    actions: {
        addPokemon(pokemon) {
            this.pokemons.push(pokemon);
        },
        //On retire un pokemon du cart
        removePokemon(pokemon) {
            this.pokemons = this.pokemons.filter(p => p.id !== pokemon.id);
        },
    },
    //On récupère le nombre de pokemons
    getters: {
        count() {
            return this.pokemons.length;
        }
    },
});