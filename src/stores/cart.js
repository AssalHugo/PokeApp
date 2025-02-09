import {defineStore} from "pinia";

//On export un store pour stocker les pokemons
export const useCartStore = defineStore('cart', {

    //On récupère la liste des pokemons
    state: () => ({
        pokemons: JSON.parse(localStorage.getItem('pokemons')) || [],
    }),

    //On ajoute un pokemon au cart
    actions: {
        addPokemon(pokemon, quantity = 1) {
            const existingPokemon = this.pokemons.find(p => p.id === pokemon.id);
            if (existingPokemon) {
                existingPokemon.quantity += quantity;
            } else {
                this.pokemons.push({...pokemon, quantity});
            }

            //On ajoute les pokemons au localStorage
            localStorage.setItem('pokemons', JSON.stringify(this.pokemons));
        },
        //On retire un pokemon du cart
        removePokemon(pokemon, quantity = 1) {
            const existingPokemon = this.pokemons.find(p => p.id === pokemon.id);
            if (existingPokemon) {
                existingPokemon.quantity -= quantity;
                if (existingPokemon.quantity <= 0) {
                    this.pokemons = this.pokemons.filter(p => p.id !== pokemon.id);
                }
            }
            //On ajoute les pokemons au localStorage
            localStorage.setItem('pokemons', JSON.stringify(this.pokemons));
        },
        setPokemonQuantity(pokemon, quantity) {
            if (quantity <= 0) {
                this.pokemons = this.pokemons.filter(p => p.id !== pokemon.id);
            }

            const existingPokemon = this.pokemons.find(p => p.id === pokemon.id);
            if (existingPokemon) {
                existingPokemon.quantity = quantity;
            }
            //On ajoute les pokemons au localStorage
            localStorage.setItem('pokemons', JSON.stringify(this.pokemons));
        }
    },
    //On récupère le nombre de pokemons
    getters: {
        count() {
            return this.pokemons.reduce((acc, p) => acc + p.quantity, 0);
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