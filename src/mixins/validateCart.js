export const validateCartMixin = {
    methods: {
        validateCart() {
            if (this.cartStore.pokemons.length === 0) {
                this.$router.push({ name: 'home' });
            }
        }
    }
};