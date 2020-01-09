<template>
  <form v-on:submit="submit">
    <label for="loginform-username">Username</label>
    <input id="loginform-username" v-model="username" type="text" placeholder="Enter username">
    <label for="loginform-password">Password</label>
    <input id="loginform-password" v-model="password" type="password" placeholder="Enter password">
    <button @click="submit">Submit</button>
    <Notification :notification="notification"/>
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
  props: {
    // msg: String,
  },
  data: () => ({
    username: '',
    password: '',
    notification: {
      type: null,
      message: null,
    },
  }),
  methods: {
    submit(e) {
      e.preventDefault();
      ApiUsernameValidation(this.username)
        .then(() => {
          this.validatePassword()
            .then(() => {
              ApiSubmit({ username: this.username, password: this.password })
                .then(() => this.setNotification(constants.NOTIFICATION_TYPE_VALID, `Congratulations ! You are now connected as ${this.username}.`))
                .catch(error => this.setNotification(constants.NOTIFICATION_TYPE_ERROR, error));
            })
            .catch(error => this.setNotification(constants.NOTIFICATION_TYPE_ERROR, error));
        })
        .catch(error => this.setNotification(constants.NOTIFICATION_TYPE_ERROR, error));
    },
    setNotification(type, message) {
      this.notification.type = type;
      this.notification.message = message;
    },
    validatePassword() {
      return new Promise((resolve, reject) => {
        // Regex which test at least the length is at least 9 characters including 1 digit
        const passwordRegex = /^(?=.*\d).{9,}$/;
        const isPasswordValid = passwordRegex.test(this.password);
        if (isPasswordValid) {
          resolve(isPasswordValid);
        } else {
          reject(new Error('Password Does Not Meet Requirements. \n Your password should be longer than 8 characters and contain at least one number'));
        }
      });
    },
  },
};
</script>

<style scoped>

</style>
