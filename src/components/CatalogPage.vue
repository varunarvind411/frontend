<template>
  <div class="catalog-container">
    <div class="left-pane">
      <SearchBar />
      <div class="sort-options">
        <label>Sort by:</label>
        <ul>
          <li :class="{ selected: sortCriteria === 'subject' }" @click="setSortCriteria('subject')">Subject</li>
          <li :class="{ selected: sortCriteria === 'price' }" @click="setSortCriteria('price')">Price</li>
          <li :class="{ selected: sortCriteria === 'space' }" @click="setSortCriteria('space')">Space</li>
          <li :class="{ selected: sortCriteria === 'location' }" @click="setSortCriteria('location')">Location</li>
        </ul>
        <label>Order:</label>
        <ul>
          <li :class="{ selected: sortOrder === 'asc' }" @click="setSortOrder('asc')">Ascending</li>
          <li :class="{ selected: sortOrder === 'desc' }" @click="setSortOrder('desc')">Descending</li>
        </ul>
      </div>
    </div>
    <div class="right-pane">
      <div class="cart-link">
<router-link to="/cart" custom>
      <template v-slot:default="{ navigate }">
        <div class="cart-container" @click="navigate">
          <img src="images/cart.png"  class="cart-icon" />
          <span class="badge">{{ cartItemCount }}</span>
        </div>
      </template>
    </router-link>
      </div>
      <div class="catalog">
        <ProductCard
          v-for="product in sortedProducts"
          :key="product._id"
          :product="product"
          @add-to-cart="addToCart"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from './SearchBar.vue';
import ProductCard from './ProductCard.vue';
import { mapState } from 'vuex';

export default {
  name: 'CatalogPage',
  components: {
    SearchBar,
    ProductCard,
  },
  data() {
    return {
      sortCriteria: 'subject',
      sortOrder: 'asc',
    };
  },
  computed: {
    ...mapState(['products', 'searchQuery', 'cart']),
    filteredProducts() {
      return this.products.filter(product =>
        product.subject.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    sortedProducts() {
      return this.filteredProducts.slice().sort((a, b) => {
        let result;
        if (this.sortCriteria === 'price') {
          result = a.price - b.price;
        } else if (this.sortCriteria === 'space') {
          result = a.space - b.space;
        } else if (this.sortCriteria === 'location') {
          result = a.location.localeCompare(b.location);
        } else {
          result = a.subject.localeCompare(b.subject);
        }
        return this.sortOrder === 'asc' ? result : -result;
      });
    },
    cartItemCount() {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    },
  },
  methods: {
    sortProducts() {
      // This is just to trigger reactivity
    },
    setSortCriteria(criteria) {
      this.sortCriteria = criteria;
      this.sortProducts();
    },
    setSortOrder(order) {
      this.sortOrder = order;
      this.sortProducts();
    },
    addToCart(product) {
      this.$store.commit('addToCart', product);
      this.reduceProductQuantity(product);
    },
    reduceProductQuantity(product) {
      const prod = this.products.find(p => p._id === product._id);
      if (prod) {
        prod.space -= 1;
      }
    },
  },
  watch: {
    filteredProducts() {
      this.sortProducts();
    },
    sortCriteria() {
      this.sortProducts();
    },
    sortOrder() {
      this.sortProducts();
    },
  },
  created() {
    this.$store.dispatch('fetchProducts');
  },
};
</script>

<style>
.catalog-container {
  display: flex;
}
.left-pane {
  width: 25%;
  padding: 20px;
  border-right: 1px solid #ccc;
}
.right-pane {
  width: 75%;
  padding: 20px;
}
.cart-link {
  position: relative;
  display: inline-block;
  margin: 10px;
}
.badge {
  position: absolute;
  top: -10px;
  right: -10px;
  padding: 5px 10px;
  border-radius: 50%;
  background-color: red;
  color: white;
}
.sort-options {
  margin-bottom: 20px;
}
.sort-options ul {
  padding-left: 0; /* Removes the padding */
  list-style-type: none; /* Removes the bullets */
}
.sort-options li {
  cursor: pointer;
  margin-bottom: 5px;
  position: relative;
}
.sort-options li.selected::before {
  content: '✓';
  color: green;
  font-weight: bold;
  margin-right: 10px;
}
.catalog {
  display: flex;
  flex-wrap: wrap;
}
.navigation .cart-container {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.navigation .cart-icon {
  width: 1px; /* Adjust the size as needed */
  height: auto;
}

</style>
