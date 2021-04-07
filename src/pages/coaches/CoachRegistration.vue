<template>
  <section>
    <base-card>
      <h2>Register as a Coach</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
  components: { CoachForm },
 
  methods: {
    saveData(data) {
      // save to store
      this.$store.dispatch('coaches/registerCoach', data);
      // redirect
      this.$router.replace('/coaches');
    },
  },
};
</script>