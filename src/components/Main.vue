<template>
  <div>
    <p>Main</p>
    <p>Курс доллара: {{ dollar }}</p>
    <Goods />
    <Basket />
  </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex'
import Goods from "@/components/Goods";
import Basket from "@/components/Basket";
export default {
  name: 'Main',
  components: {
    Goods,
    Basket
  },
  methods: {
    ...mapActions({
      jumpStart: 'jumpStart'
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
