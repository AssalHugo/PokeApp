<script>
import {useCartStore} from "@/stores/cart.js";

export default {
  name: "orderConfirmationView",
  data () {
    return {
      cartStore: useCartStore()
    }
  },
  methods: {
    confirmOrder() {
      this.$router.push({name: 'order-confirmed'});
    },
    cancelOrder() {
      this.$router.push({name: 'cart'});
    }
  }
}
</script>

<template>
  <div class="order-confirmation p-4 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold text-center text-gray-800">Order Confirmation</h1>
    <div class="text-center">
      <p>The total price of your order is {{ cartStore.totalPrice }} €</p>
      <p>Are you sure you want to place this order?</p>
      <div class="flex justify-center mt-4 space-x-4">
        <button @click="confirmOrder"
                class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
          Yes
        </button>
        <button @click="cancelOrder"
                class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
          No
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>