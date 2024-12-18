<template>
  <div>
    <input
      type="text"
      placeholder="Search for Subject or Activity..."
      v-model="searchQuery"
    />
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'SearchBar',
  computed: {
    searchQuery: {
      get() {
        return this.$store.state.searchQuery;
      },
      set(value) {
        this.setSearchQuery(value);
      },
    },
  },
  methods: {
    ...mapMutations(['setSearchQuery']),
  },
};
</script>
