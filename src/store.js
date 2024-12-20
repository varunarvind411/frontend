import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [], // This will be filled with fetch
    cart: [],
    searchQuery: '',
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
clearCart(state) { state.cart = []; },
    addToCart(state, product) {
      const cartItem = state.cart.find(item => item._id === product._id);
      if (cartItem) {
        cartItem.quantity++;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
      const productInStore = state.products.find(p => p._id === product._id);
      if (productInStore) {
        productInStore.stock--;
      }
    },
    removeFromCart(state, product) {
      const cartIndex = state.cart.findIndex(item => item._id === product._id);
      if (cartIndex > -1) {
        const cartItem = state.cart[cartIndex];
        state.cart.splice(cartIndex, 1);
        const productInStore = state.products.find(p => p._id === product._id);
        if (productInStore) {
          productInStore.stock += cartItem.quantity;
        }
      }
    },
    setSearchQuery(state, query) {
      state.searchQuery = query;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      const response = await fetch('https://backend-6s76.onrender.com/api/courses');
      const data = await response.json();
      commit('setProducts', data);
    },
  },
});
