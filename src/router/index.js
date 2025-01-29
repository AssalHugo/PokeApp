import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PokemonDetailsView from '../views/PokemonDetailsView.vue'
import CartView from '../views/CartView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/pokemon/:id',
            name: 'pokemon-details',
            component: PokemonDetailsView,
            props: true
        },
        {
            path: '/cart',
            name: 'cart',
            component: CartView,
            props: true
        }
    ],
})

export default router