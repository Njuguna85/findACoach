<template>
  <base-card>
    <h2>Find Your Coach</h2>
    <span class="filter-option">
      <label for="frontend">Frontend</label>
      <input
        type="checkbox"
        name="frontend"
        id="frontend"
        checked
        @change="setFilter"
      />

      <label for="backend">Backend</label>
      <input
        type="checkbox"
        name="backend"
        id="backend"
        checked
        @change="setFilter"
      />

      <label for="career">Career</label>
      <input
        type="checkbox"
        name="career"
        id="career"
        checked
        @change="setFilter"
      />
    </span>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      // as long as the filter keys are true, coaches that have that area of expertise should be shown
      filters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  methods: {
    setFilter(event) {
      const inputId = event.target.id;
      const isActive = event.target.checked;
      const updatedFilters = {
        ...this.filters,
        [inputId]: isActive,
      };
      this.filters = updatedFilters;

      this.$emit('change-filter', updatedFilters);
    },
  },
  emits: ['change-filter'],
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>