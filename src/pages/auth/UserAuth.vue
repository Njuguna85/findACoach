<template>
  <div>
    <base-dialog :show="!!error" title="An Error occurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @keyup.enter="submitForm" @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Email: </label>
          <input type="email" name="email" id="email" v-model.trim="email" />
        </div>

        <div class="form-control">
          <label for="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            v-model.trim="password"
          />
        </div>
        <p v-if="!formIsValid">
          Please enter a valid email and password (must be at least 6 characters
          long.)
        </p>

        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthModel"
          >{{ switchModeButtonCaption }}
        </base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
import BaseDialog from '../../components/BaseDialog/BaseDialog.vue';
export default {
  components: { BaseDialog },
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;

      // validating
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }
      this.isLoading = true;
      const actonPaylod = {
        email: this.email,
        password: this.password,
      };

      // form is fine
      try {
        //   send http request
        if (this.mode === 'login') {
          await this.$store.dispatch('login', actonPaylod);
        } else {
          await this.$store.dispatch('signup', actonPaylod);
        }

        const redirectUrl = '/' + (this.$route.query.redirect || 'coaches');

        this.$router.replace(redirectUrl);
      } catch (error) {
        this.error = error.message || 'Failed to sign up, try later';
      }
      this.isLoading = false;
    },
    switchAuthModel() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },
    handleError() {
      this.error = null;
    },
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === 'login') {
        return 'Login';
      } else {
        return 'Signup';
      }
    },
    switchModeButtonCaption() {
      if (this.mode === 'login') {
        return 'Sign Up Instead';
      } else {
        return 'Login Instead';
      }
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>