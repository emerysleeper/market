<template>
  <div
      class="popup"
      @click.self="setPopupMode(null)"
  >
    <div class="popup__main">
      <component :is="mode" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Settings from '@/components/Popup/Settings'
export default {
  name: 'Popup',
  components: {
    Settings
  },
  props: {
    mode: {
      type: String,
      required: false
    }
  },
  methods: {
    ...mapActions('popup', {
      setPopupMode: 'setPopupMode'
    })
  }
}
</script>

<style lang="scss" scoped>
.popup {
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  &__main {
    width: 500px;
    height: 500px;
    background-color: white;
  }
}
</style>
