<template>
  <form v-on:submit="submit" class="loginform">
    <div class="loginform__content">
      <header class="loginform__header">LOGIN</header>
      <label for="loginform-username" class="loginform__label">Username</label>
      <input id="loginform-username" class="loginform__input" v-model="username"
             type="text" placeholder="Enter username" v-on:keyup="validateUsername">
      <label for="loginform-password" class="loginform__label">Password</label>
      <input id="loginform-password" class="loginform__input" v-model="password" type="password"
             placeholder="Enter password" v-on:keyup="validatePassword">
      <button @click="submit" class="loginform__submit" :disabled="!isSubmitEnabled">SUBMIT</button>
      <Notification :notification="notification" class="loginform__notification"/>
    </div>
  </form>
</template>

<script>
import Notification from './Notification.vue';
import { validate as ApiUsernameValidation, submit as ApiSubmit } from '../api';
import constants from '../constants';

export default {
  name: 'LoginForm',
  components: {
    Notification,
  },
  data: () => ({
    username: '',
    password: '',
    notification: {
      type: null,
      message: null,
    },
    usernameTimeout: null,
    isUsernameValid: false,
    passwordTimeout: null,
    isPasswordValid: false,
  }),
  computed: {
    isSubmitEnabled() {
      return this.isUsernameValid && this.isPasswordValid;
    },
  },
  methods: {
    submit(e) {
      e.preventDefault();
      ApiSubmit({ username: this.username, password: this.password })
        .then(() => this.setNotification(constants.NOTIFICATION_TYPE_VALID, `Congratulations ! You are now connected as ${this.username}.`))
        .catch(error => this.setNotification(constants.NOTIFICATION_TYPE_ERROR, error));
    },
    setNotification(type, message) {
      this.notification.type = type;
      this.notification.message = message;
    },
    validateUsername() {
      clearTimeout(this.usernameTimeout);
      this.isUsernameValid = false;

      // Check if username is valid 1 second after user types
      this.usernameTimeout = setTimeout(() => {
        ApiUsernameValidation(this.username)
          .then(() => {
            this.isUsernameValid = true;
            console.log(this.isUsernameValid);
            this.resetNotification();
          })
          .catch(error => this.setNotification(constants.NOTIFICATION_TYPE_ERROR, error));
      }, 1000);
    },
    validatePassword() {
      clearTimeout(this.passwordTimeout);
      this.isPasswordValid = false;

      // Check if password is valid 1 second after user types
      this.passwordTimeout = setTimeout(() => {
        // Regex which test the length is at least 9 characters including 1 digit
        const passwordRegex = /^(?=.*\d).{9,}$/;
        const isPasswordValid = passwordRegex.test(this.password);
        if (isPasswordValid) {
          this.isPasswordValid = true;
          this.resetNotification();
        } else {
          this.setNotification(constants.NOTIFICATION_TYPE_ERROR, 'Password does not meet requirements. Your password should be at least 9 characters and contain at least one number');
        }
      });
    },
    resetNotification() {
      this.notification.type = null;
      this.notification.message = null;
    },
  },
};
</script>

<style lang="less" scoped>
.loginform {
  display: flex;
  justify-content: center;
  height: 80%;
}

.loginform__content {
  display: flex;
  width: 50%;
  flex-direction: column;
  justify-content: center;
  background-color: #ffffff;
  padding: 2em;

  .loginform__header {
    color: #41ffb4;
    margin-bottom: 10%;
    font-weight: bold;
  }

  .loginform__input, .loginform__submit {
    border: 0;
    height: 2em;
    margin: 10px;
  }

  .loginform__label {
    font-weight: bold;
  }

  .loginform__input {
    background-color: #f1f1f1;
  }

  .loginform__submit {
    background-color: #41ffb4;
    color: #000000;
    font-weight: bold;
  }

  .loginform__submit:disabled {
    background-color: darkgrey;
  }
}

/* A bit of responsive... */
@media only screen and (max-width: 768px) {
  .loginform__content {
    width: 100%;
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
