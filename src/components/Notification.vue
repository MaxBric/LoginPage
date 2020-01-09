<template>
  <div v-bind:class="{ notification,
    'notification__message--valid': notification.type === NOTIFICATION_TYPE_VALID,
    'notification__message--invalid': notification.type === NOTIFICATION_TYPE_ERROR,
    'notification__message--requesting': notification.type === NOTIFICATION_TYPE_REQUESTING }">
    <span v-if="notification.type === NOTIFICATION_TYPE_VALID">&#10003;</span>
    <span v-if="notification.type === NOTIFICATION_TYPE_ERROR">&#10006;</span>
    <span v-if="notification.type === NOTIFICATION_TYPE_REQUESTING">&#10148;</span>
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
    NOTIFICATION_TYPE_REQUESTING: constants.NOTIFICATION_TYPE_REQUESTING,
  }),
};
</script>

<style scoped>
  .notification {
    height: 30px;
  }

  .notification__message--valid {
    color: forestgreen;
  }

  .notification__message--invalid {
    color: darkred;
  }

  .notification__message--requesting {
    color: darkorange;
  }
</style>
