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
  font-family: Georgia, serif;
}

* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
