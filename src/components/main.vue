<template>
  <div>
    <p>Main</p>
  </div>
</template>


<script>
import { mapActions } from 'vuex'
export default {
  name: 'Main',
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
