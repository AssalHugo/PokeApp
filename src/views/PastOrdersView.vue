<script>
import {useCartStore} from "@/stores/cart.js";

export default {
  name: "PastOrders",
  data() {
    return {
      cartStore: useCartStore()
    }
  },
}
</script>

<template>
  <div class="order-confirmation p-4 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold text-center text-gray-800">Past Orders</h1>
    <div class="text-center">
      <p>Your past orders:</p>
      <div v-for="order in cartStore.getPastOrdersSorted" :key="order.id" class="mt-8">
        <div class="flex justify-between mt-4">
          <p>Order ID: {{ order.id }}</p>
          <p>Total price: {{ order.totalPrice }} €</p>
        </div>
        <div class="flex justify-between mt-4">
          <p>Order date: {{ order.date }}</p>
          <p>Order status: {{ order.status }}</p>
        </div>
        <div class="flex justify-between mt-4">
          <p>Ordered pokemons:</p>
          <div>
            <div v-for="pokemon in order.pokemons" :key="pokemon.id">
              <p>{{ pokemon.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>