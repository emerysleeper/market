<template>
  <div id="app">
    <Main />
    <Popup v-if="popupMode" :mode="popupMode"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import '@/assets/style/global.scss'
import Main from '@/components/index'
import Popup from "@/components/UI/Popup";
export default {
  name: 'App',
  components: {
    Main,
    Popup
  },
  computed: {
    ...mapGetters('popup', {
      popupMode: 'getPopupMode'
    })
  }
}
</script>

<style>
#app {
position: relative;
}
</style>
