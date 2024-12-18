<template>
  <div class="product-card">
    <img :src="product.image || 'images/math.jpg'" alt="Product Image" />
    <h3>{{ product.subject }}</h3>
    <p>Price: ${{ product.price }}</p>
    <p>Space: {{ product.space }}</p>
    <p>Location: {{ product.location }}</p>
    <button @click="$emit('add-to-cart', product)" :disabled="product.space === 0">
      {{ product.space > 0 ? 'Add to Cart' : 'Out of Space' }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  }
};
</script>

<style>
.product-card {
  border: 1px solid #ccc;
  padding: 16px;
  margin: 8px;
  text-align: center;
}
.product-card img {
  width: 25%; /* Sets the image width to 50% */
  height: auto;
}
</style>
