<template>
  <div class="settings">
    <div class="settings__block">
      <p>Установить курс доллара вручную</p>
      <input v-model="dollar" />
    </div>
    <div class="settings__block">
      <p>Установить новый интервал обновлений</p>
      <input v-model="interval" />
    </div>
    <div
        @click="setSettings"
        class="button"
    >
      <p>Применить</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Settings',
  data () {
    return {
      dollar: 80,
      interval: 15
    }
  },
  methods: {
    ...mapActions({
      changeDollarCourse: 'changeDollarCourse',
      restartTimer: 'restartTimer'
    }),
    ...mapActions('popup', {
      setPopupMode: 'setPopupMode'
    }),
    async setSettings () {
      this.changeDollarCourse(this.dollar)
      this.restartTimer(this.interval)
      this.setPopupMode(null)
    }
  }
}
</script>

<style lang="scss" scoped>
.settings {
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;

  &__block {
    margin-bottom: 20px;
    p {
      margin: 5px 0;
    }
  }
}

</style>
