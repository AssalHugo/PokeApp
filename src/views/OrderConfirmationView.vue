<script>
import {useCartStore} from "@/stores/cart.js";
export default {
  name: "OrderConfirmationView",
  data() {
    return {
      cartStore: useCartStore()
    }
  },
  mounted() {
    this.cartStore.clearCart()
    //On redirige vers la page d'accueil après 5 secondes
    setTimeout(() => {
      this.$router.push({name: 'home'})
    }, 5000)
  }
}
</script>

<template>
  <div class="order-confirmation p-4 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold text-center text-gray-800">Order Confirmation</h1>
    <div class="text-center">
      <p>Your order has been placed successfully.</p>
      <p>Thank you for shopping with us!</p>
      <p>You will be redirected to the home page in 5 seconds.</p>
    </div>
  </div>
</template>

<style scoped>

</style>