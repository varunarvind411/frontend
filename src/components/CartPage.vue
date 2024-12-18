<template>
  <div>
    <h2>Shopping Cart</h2>
    <div v-for="item in cart" :key="item._id" class="cart-item">
      <h3>{{ item.subject }}</h3>
      <p>Price: ${{ item.price }}</p>
      <p>Location: ${{ item.location }}</p>
      <p>Quantity: {{ item.quantity }}</p>
      <button @click="removeFromCart(item)">Remove</button>
    </div>

    <router-link to="/" custom>
      <template v-slot:default="{ navigate, isActive, isExactActive }">
        <button :class="{ active: isActive, exactActive: isExactActive }" @click="navigate">
         Back to Catalog
        </button>
      </template>
    </router-link>

    <router-link v-if="cart.length" to="/checkout" custom>
      <template v-slot:default="{ navigate, isActive, isExactActive }">
        <button :class="{ active: isActive, exactActive: isExactActive }" @click="navigate">
          Proceed to Checkout
        </button>
      </template>
    </router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'CartPage',
  computed: {
    ...mapState(['cart']),
  },
  methods: {
    removeFromCart(item) {
      this.$store.commit('removeFromCart', item);
    },
  },
};
</script>

<style>
.cart-item {
  border: 1px solid #ccc;
  padding: 16px;
  margin: 8px;
}
.navigation {
  display: flex;
  justify-content: space-around;
  background-color: #333;
  padding: 10px;
}
.navigation button {
  padding: 10px 20px;
  background-color: blue;
  color: white;
  border: none;
  cursor: pointer;
  text-align: center;
}
.navigation button.disabled {
  pointer-events: none;
  opacity: 0.5;
}
.navigation button:hover {
  background-color: darkblue;
}
.badge {
  background-color: red;
  color: white;
}

</style>