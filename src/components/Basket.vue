<template>
  <div class="basket">
    <div>
      <p>Корзина товаров</p>
    </div>
    <div v-if="basket">
      <div
          v-for="(good, i) in basket"
          :key="i"
          class="basket__block"
      >
        <div class="basket__name">
          <p>Название - {{ good.itemName }} </p>
        </div>
        <div class="basket__info">
          <p>Цена/шт - {{ good.price | dollarToRuble(dollarCourse) }} р </p>
          <p>Цена за {{ good.amount }} шт. - {{ good.price * good.amount | dollarToRuble(dollarCourse) }} р </p>
          <p>Количество - {{ good.quantity }} </p>
        </div>
        <Amount :amount="good.amount" :id="i" />
        <div
            class="basket__delete"
            @click="deleteFromBasket(good.itemId)"
        >
          <p>Удалить из корзины</p>
        </div>
      </div>
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
import { mapGetters, mapActions } from 'vuex'
import Amount from "@/components/Amount";
export default {
  name: 'Basket',
  components: {
    Amount
  },
  methods: {
    ...mapActions({
      deleteFromBasket: 'deleteFromBasket'
    })
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
        return  (Math.round((sum * this.dollarCourse) * 100) / 100)
      } else {
        return 0
      }
    }
  },
  filters: {
    dollarToRuble (dollar, course) {
      return Math.round((dollar * course) * 100) / 100
      // return dollar
    }
  }
}
</script>

<style lang="scss" scoped>
.basket {
  display: flex;
  flex-direction: column;

  &__block {
    display: flex;
    width: fit-content;
  }

  &__name {
    width: 400px;
  }

  &__info {
    width: 400px;
    display: flex;
    justify-content: space-between;
  }

  &__delete {
    width: 180px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: grey;
    cursor: pointer;
    p {
      user-select: none;
    }
  }

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
