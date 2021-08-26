<template>
  <div class="main">
    <div
        class="main__settings button"
        @click="setPopupMode('Settings')"
    >
      <p>Настройки</p>
    </div>
    <p>Курс доллара: {{ dollar }}</p>
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
