<template>
  <div class="basket">
    <div class="banner">
      <p>Корзина товаров</p>
    </div>
    <div v-if="basket.length">
      <Good
          v-for="(good, i) in basket"
          :key="i"
          :good="good"
          :id="i"
          mode="basket"
      />
      <div class="basket__bottom">
        <div class="banner">
          <p>Итоговая цена: {{ total }} рублей</p>
        </div>
        <div
            @click="buy"
            class="basket__buy button"
        >
          <p>Купить</p>
        </div>
      </div>
    </div>
    <p v-else class="banner">Товаров пока нет</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Good from "@/components/UI/Good"
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
    // Total sum of all goods, will change with the prices
    total () {
      if (this.basket.length) {
        let sum = 0
        for (let i in this.basket) {
          sum += this.basket[i].amount * this.basket[i].price
        }
        return (Math.round((sum * this.dollarCourse) * 100) / 100).toFixed(2)
      } else {
        return 0
      }
    }
  },
  methods: {
    ...mapActions('popup', {
      setSum: 'setSum',
      setPopupMode: 'setPopupMode'
    }),
    // ATTENTION! It will set the current sum. The customer will buy things with
    // the prices they had at the moment he pushed the button
    buy () {
      if (this.total !== 0) {
        this.setSum(this.total)
        this.setPopupMode('Buy')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.basket {
  display: flex;
  width: 1200px;
  flex-direction: column;
  background-color: #ffcf96;
  padding: 20px;
  border-radius: 10px;

  .banner {
    font-size: 25px;
    font-weight: bold;
    color: #2a4e75;
    margin-bottom: 20px;
  }

  &__total {
    display: flex;
    width: 1000px;
    justify-content: space-between;
  }

  &__bottom {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .banner {
      margin: 0;
    }
  }
}
</style>
