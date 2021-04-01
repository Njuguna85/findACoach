<template>
  <section>FILTER</section>
  <section>
    <div class="controls">
      <button @click="logst">Refresh</button>
      <router-link to="/register">Register as a coach</router-link>
    </div>
    <ul>
      <li v-for="coach in filteredCoaches" :key="coach.id">
        {{ coach.firstName }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  computed: {
    filteredCoaches() {
      return this.$store.getters['coaches/coaches'];
    },
  },
  methods: {
    logst() {
      console.log(this.$store.state.coaches);
    },
  },
};
</script>

<style scoped>
</style>