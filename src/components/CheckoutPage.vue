<template>
  <div>
    <h2>Checkout</h2>
    <form @submit.prevent="submitCheckout">
      <div>
        <label for="name">Name:</label>
        <input
          type="text"
          id="name"
          v-model="name"
          @input="validateName"
        />
        <span v-if="nameError" class="error">{{ nameError }}</span>
      </div>
      <div>
        <label for="phone">Phone Number:</label>
        <input
          type="text"
          id="phone"
          v-model="phone"
          @input="validatePhone"
        />
        <span v-if="phoneError" class="error">{{ phoneError }}</span>
      </div>
      <!-- Other form fields here -->
      <button type="submit" :disabled="isFormInvalid">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      nameError: '',
      phone: '',
      phoneError: '',
    };
  },
  computed: {
    isFormInvalid() {
      return this.nameError || !this.name || this.phoneError || !this.phone;
    }
  },
  methods: {
    validateName() {
      if (!this.name) {
        this.nameError = 'Name is required.';
      } else {
        this.nameError = '';
      }
    },
    validatePhone() {
      const phonePattern = /^[0-9]{10}$/;
      if (!phonePattern.test(this.phone)) {
        this.phoneError = 'Invalid phone number. Must be 10 digits.';
      } else {
        this.phoneError = '';
      }
    },
    submitCheckout() {
      if (!this.isFormInvalid) {
        // Display an alert message
        alert("Your order has been submitted successfully!");

        // Reset the form fields
        this.name = '';
        this.nameError = '';
        this.phone = '';
        this.phoneError = '';

        // Reset the cart
        this.$store.commit('clearCart');

        // Programmatically navigate to the catalog page
        this.$router.push('/');
      }
    }
  }
};
</script>

<style>
.error {
  color: red;
}
</style>
