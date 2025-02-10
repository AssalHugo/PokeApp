import {defineStore} from "pinia";
import {v4 as uuidv4} from 'uuid';

//On export un store pour stocker les pokemons
export const useCartStore = defineStore('cart', {

    //On récupère la liste des pokemons
    state: () => ({
        pokemons: JSON.parse(localStorage.getItem('pokemons')) || [],
        pastOrders: JSON.parse(localStorage.getItem('pastOrders')) || [],
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
        removePokemon(pokemon) {
            this.pokemons = this.pokemons.filter(p => p.id !== pokemon.id);
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
        },
        clearCart() {
            this.addPastOrder(this.pokemons);
            this.pokemons = [];
            //On ajoute les pokemons au localStorage
            localStorage.setItem('pokemons', JSON.stringify(this.pokemons));
        },
        addPastOrder(pokemons) {
            const date = new Date();
            const order = {
                id: uuidv4(),
                totalPrice: pokemons.reduce((acc, p) => acc + p.quantity * p.base_experience, 0),
                date: date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
                pokemons,
            }
            console.log(order);
            console.log("order");

            this.pastOrders.push(order);
            localStorage.setItem('pastOrders', JSON.stringify(this.pastOrders));
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
        },
        //On récupère le prix total des pokemons
        totalPrice() {
            return this.pokemons.reduce((acc, p) => acc + p.quantity * p.base_experience, 0);
        },
        getByType(type) {
            return this.pokemons.filter(p => p.types.includes(type));
        },
        getPastOrdersSorted() {
            return this.pastOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
    },
});