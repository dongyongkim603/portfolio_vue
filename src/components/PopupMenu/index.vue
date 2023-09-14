<template>
  <div>
    <button class="button is-primary" @click="togglePopup">Open Popup</button>
    <div class="popup" v-if="popupActive">
      <div class="popup-content">
        <p>This is a custom popup menu.</p>
        <button class="button is-danger" @click="closePopup">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      popupActive: this.isOpen,
    };
  },
  methods: {
    togglePopup() {
      this.popupActive = true;
    },
    closePopup() {
      this.popupActive = false;
    },
  },
};
</script>
<style scoped>
.popup {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  padding: 20px;
  z-index: 10;
}

.popup-content {
  text-align: center;
}
</style>