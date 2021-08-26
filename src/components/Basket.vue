<template>
  <div class="basket">
    <div>
      <p>Корзина товаров</p>
    </div>
    <div v-if="basket">
      <Good
          v-for="(good, i) in basket"
          :key="i"
          :good="good"
          :id="i"
      />
      <div class="basket__total">
        <p>Итоговая цена: {{ total }} рублей</p>
        <div class="basket__buy">
          <p>Купить</p>
        </div>
      </div>
    </div>
    <p v-else>Товаров пока нет</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Good from "@/components/Good"
export default {
  name: 'Basket',
  components: {
    Good
  },
  computed: {
    ...mapGetters({
      basket: 'getBasket',
      dollarCourse: 'getDollarCourse'
    }),
    total () {
      if (this.basket.length) {
        let sum = 0
        for (let i in this.basket) {
          sum += this.basket[i].amount * this.basket[i].price
        }
        return  (Math.round((sum * this.dollarCourse) * 100) / 100).toFixed(2)
      } else {
        return 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.basket {
  display: flex;
  flex-direction: column;

  &__total {
    display: flex;
    width: 1000px;
    justify-content: space-between;
  }

  &__buy {
    width: 100px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: grey;
    cursor: pointer;
  }
}
</style>
