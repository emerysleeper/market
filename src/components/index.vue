<template>
  <div class="main">
    <div class="main__header">
      <div class="banner">
        <p>Курс доллара: {{ dollar }}</p>
      </div>
      <div
          class="button"
          @click="setPopupMode('Settings')"
      >
        <p>Настройки</p>
      </div>
    </div>
    <Goods />
    <Basket />
  </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex'
import Goods from "@/components/Main/Goods";
import Basket from "@/components/Main/Basket";
export default {
  name: 'Main',
  components: {
    Goods,
    Basket
  },
  methods: {
    ...mapActions({
      jumpStart: 'jumpStart'
    }),
    ...mapActions('popup', {
      setPopupMode: 'setPopupMode'
    })
  },
  computed: {
    ...mapGetters({
      dollar: 'getDollarCourse'
    })
  },
  created () {
    this.jumpStart()
  }
}
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0;
  width: 100%;

  &__header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background-color: #2a4e75;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 100px;
  }
}
</style>
