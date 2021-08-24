<template>
  <div>
    <input v-model="goodAmount"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
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
      changeAmount: 'changeAmount'
    })
  },
  computed: {
    goodAmount: {
      get () {
        return this.amount
      },
      set (val) {
        this.changeAmount({ id: this.id, amount: parseInt(val, 10)})
      }
    }
  }
}
</script>
