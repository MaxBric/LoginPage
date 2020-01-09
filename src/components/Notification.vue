<template>
  <div v-bind:class="{ 'notification-message-valid': notification.type === 'valid',
                       'notification-message-invalid': notification.type === 'error' }">
    {{notification.message}}
  </div>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    notification: Object,
  },
  methods: {
    // setMessage(value) {
    //   console.log(value);
    //   this.message = value;
    // },
  },
};
</script>

<style scoped>
  .notification-message-valid {
    background-color: lightgreen;
  }

  .notification-message-invalid {
    background-color: lightcoral;
  }
</style>
