<template>
  <div>
    <input :value="amount" @keyup="changeAmount($event)"/>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'Amount',
  props: {
    amount: {
      type: Number,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  methods: {
    ...mapActions({
      changeGoodAmount: 'changeAmount'
    }),
    //Function to change amount in the input; mostly cheking so that people wouldn't input impossible values
    changeAmount (e) {
      if (e.target.value === '') {
        return false
      } else if (!e.target.value.match(/^[0-9]+$/)) {
        e.target.value = 1
      } else if (parseInt(e.target.value, 10) === 0) {
        e.target.value = 1
        this.changeGoodAmount({ id: this.id, amount: 1 })
      } else if (parseInt(e.target.value, 10) > this.basket[this.id].quantity) {
        e.target.value = this.basket[this.id].quantity
        this.changeGoodAmount({ id: this.id, amount: this.basket[this.id].quantity })
      } else {
        this.changeGoodAmount({ id: this.id, amount: e.target.value })
      }
    }
  },
  computed: {
    ...mapGetters({
      basket: 'getBasket'
    })
  }
}
</script>
