import {defineStore} from "pinia";

//On export un store pour stocker les pokemons
export const useCartStore = defineStore('cart', {

    //On récupère la liste des pokemons
    state: () => ({
        pokemons: JSON.parse(localStorage.getItem('pokemons')) || [],
    }),

    //On ajoute un pokemon au cart
    actions: {
        addPokemon(pokemon) {
            this.pokemons.push(pokemon);
            //On ajout les pokemons dans le localStorage
            localStorage.setItem('pokemons', JSON.stringify(this.pokemons));
        },
        //On retire un pokemon du cart
        removePokemon(pokemon) {
            this.pokemons = this.pokemons.filter(p => p.id !== pokemon.id);

            //On retire les pokemons du localStorage
            localStorage.setItem('pokemons', JSON.stringify(this.pokemons));
        },
    },
    //On récupère le nombre de pokemons
    getters: {
        count() {
            return this.pokemons.length;
        },
        getPokemons() {
            if (this.pokemons.length === 0) {
                const pokemons = localStorage.getItem('pokemons');
                if (pokemons) {
                    this.pokemons = JSON.parse(pokemons);
                }
            }
            return this.pokemons;
        }
    },
});