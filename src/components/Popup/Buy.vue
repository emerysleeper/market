<template>
  <div class="buy">
    <p class="buy__ask">Вы желаете приобрести все товары в корзине?</p>
    <p class="banner">Сумма товаров составляет {{ sum }} рублей</p>
    <div class="buy__controls">
      <div @click="confirmBuy"
           class="button"
      >
        <p>Да</p>
      </div>
      <div @click="declineBuy"
           class="button"
      >
        <p>Нет</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Settings',
  computed: {
    ...mapGetters('popup', {
      sum: 'getSum'
    })
  },
  methods: {
    ...mapActions('popup', {
      setSum: 'setSum',
      setPopupMode: 'setPopupMode'
    }),
    ...mapActions({
      eraseBasket:'eraseBasket'
    }),
    confirmBuy () {
      this.eraseBasket()
      this.setPopupMode('Success')
    },
    declineBuy () {
      this.setSum(null)
      this.setPopupMode(null)
    }
  }
}
</script>

<style lang="scss" scoped>
.buy {
  padding: 20px;

  &__ask {
    font-size: 22px;
    font-weight: bold;
  }

  .banner {
    background-color: palevioletred;
  }

  &__controls {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
}
</style>
