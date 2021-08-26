<template>
  <div>
    <div>
      <p>Установить курс доллара вручную</p>
      <input v-model="dollar" />
    </div>
    <div>
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
      await this.restartTimer(this.interval)
      this.setPopupMode(null)
    }
  }
}
</script>
