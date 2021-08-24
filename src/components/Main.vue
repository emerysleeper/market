<template>
  <div>
    <p>Main</p>
    <Goods />
    <Basket />
  </div>
</template>


<script>
import { mapActions } from 'vuex'
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
  created () {
    this.jumpStart()
  }
}
</script>
