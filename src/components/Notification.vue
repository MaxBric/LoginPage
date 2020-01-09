<template>
  <div v-bind:class="{ 'notification-message-valid': notification.type === NOTIFICATION_TYPE_VALID,
       'notification-message-invalid': notification.type === NOTIFICATION_TYPE_ERROR }">
    {{notification.message}}
  </div>
</template>

<script>
import constants from '../constants';

export default {
  name: 'Notification',
  props: {
    notification: Object,
  },
  data: () => ({
    NOTIFICATION_TYPE_VALID: constants.NOTIFICATION_TYPE_VALID,
    NOTIFICATION_TYPE_ERROR: constants.NOTIFICATION_TYPE_ERROR,
  }),
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
