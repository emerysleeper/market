<template>
  <div class="amount">
    <input
        :value="amount"
        ref="amount"
        @keyup="changeAmount($event)"
        class="amount__input"
    />
    <div class="amount__controls">
      <img
          src="@/assets/arrow-control.svg"
          @click="addAmount()"
      />
      <img
          src="@/assets/arrow-control.svg"
          @click="reduceAmount()"
      />
    </div>
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
    },
    // Functions for arrows, won't allow wrong value
    addAmount () {
      if (this.amount < this.basket[this.id].quantity) {
        this.changeGoodAmount({ id: this.id, amount: this.amount + 1 })
      }
    },
    reduceAmount () {
      if (this.amount > 1) {
        this.changeGoodAmount({ id: this.id, amount: this.amount - 1 })
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

<style lang="scss" scoped>
.amount {
  width: 100%;
  margin: 10px 0;
  display: flex;

  &__input {
    width: 50%;
  }

  &__controls {
    width: 20px;
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-left: 10px;

    img:last-child {
      transform: rotate(180deg);
    }
  }

}
</style>
