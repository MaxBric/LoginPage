<template>
  <form v-on:submit="submit" class="loginform">
    <div class="loginform__content">
      <header class="loginform__header">LOGIN</header>
      <label for="loginform-username" class="loginform__label">Username</label>
      <input id="loginform-username" class="loginform__input" v-model="username"
             type="text" placeholder="Enter username">
      <label for="loginform-password" class="loginform__label">Password</label>
      <input id="loginform-password" class="loginform__input" v-model="password" type="password"
             placeholder="Enter password">
      <button @click="submit" class="loginform__submit">SUBMIT</button>
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
        // Regex which test the length is at least 9 characters including 1 digit
        const passwordRegex = /^(?=.*\d).{9,}$/;
        const isPasswordValid = passwordRegex.test(this.password);
        if (isPasswordValid) {
          resolve(isPasswordValid);
        } else {
          reject(new Error('Password does not meet requirements. Your password should be longer than 8 characters and contain at least one number'));
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.loginform {
  display: flex;
  justify-content: center;
  padding-top: 5%;
}

.loginform__content {
  display: flex;
  width: 50%;
  flex-direction: column;
  justify-content: center;
  background-color: #ffffff;
  padding: 2em;

  .loginform__header {
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
}
</style>
