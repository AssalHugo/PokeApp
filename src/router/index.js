import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PokemonDetailsView from '../views/PokemonDetailsView.vue'
import CartView from '../views/CartView.vue'
import OrderView from "@/views/OrderView.vue";
import OrderConfirmationView from "@/views/OrderConfirmationView.vue";
import PastOrdersView from "@/views/PastOrdersView.vue";

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
        },
        {
            path: '/cart/order',
            name: 'order',
            component: OrderView,
            props: true
        },
        {
            path: '/cart/order/confirmation',
            name: 'order-confirmed',
            component: OrderConfirmationView,
            props: true
        },
        {
            path: '/cart/past-orders',
            name: 'past-orders',
            component: PastOrdersView
        }
    ],
})

export default router