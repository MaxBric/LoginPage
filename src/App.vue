<template>
  <div id="app">
    <LoginForm/>
  </div>
</template>

<script>
import LoginForm from './components/LoginForm.vue';

export default {
  name: 'app',
  components: {
    LoginForm,
  },
};
</script>

<style lang="less">
  html, body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f1f1f1;
  height: 100%;
  width: 100%;
}
</style>
