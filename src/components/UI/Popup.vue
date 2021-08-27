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
import Buy from '@/components/Popup/Buy'
import Delete from '@/components/Popup/Delete'
import Success from '@/components/Popup/Success'
export default {
  name: 'Popup',
  components: {
    Settings,
    Buy,
    Delete,
    Success
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
    height: fit-content;
    background-color: white;
  }
}
</style>
