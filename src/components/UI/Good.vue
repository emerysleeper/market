<template>
  <div
      class="good"
      :class="{ priceClass : mode === 'basket'}"
  >
      <div class="good__name">
        <p>Название - {{ good.itemName }} </p>
      </div>
<!--    Вид товаров для корзины -->
    <div v-if="mode === 'basket'">
      <div class="good__info">
        <p>Цена/шт - {{ rublePrice }} р </p>
        <p>Цена за {{ good.amount }} шт. - {{ rublePrice * good.amount  }} р </p>
        <p>Количество - {{ good.quantity }} </p>
      </div>
      <Amount :amount="good.amount" :id="id" />
      <div

          class="good__delete"
          @click="deleteFromBasket(good.itemId)"
      >
        <p>Удалить из корзины</p>
      </div>
    </div>
<!--    Вид товара для списка товаров -->
    <div v-else>
      <div class="goods__info">
        <p>Цена - {{ good.price | dollarToRuble(dollarCourse) }} </p>
        <p>Количество - {{ good.quantity }} </p>
      </div>
      <div
          class="goods__add"
          @click="addToBasket({ name: good.groupName, id: good.itemId })"
      >
        <p>Добавить в корзину</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters} from 'vuex'
import Amount from "@/components/UI/Amount";
export default {
  name: "Good",
  components: {
    Amount
  },
  data () {
    return {
      priceClass: 'neutral'
    }
  },
  props: {
    good: {
      type: Object,
      required: true
    },
    id: {
      type: Number,
      required: true
    },
    mode: {
      type: String,
      required: false,
      default: 'default'
    }
  },
  computed: {
    ...mapGetters({
      dollarCourse: 'getDollarCourse'
    }),
    rublePrice () {
      return parseFloat((Math.round((this.good.price * this.dollarCourse) * 100) / 100).toFixed(2))
    }
  },
  methods: {
    ...mapActions({
      deleteFromBasket: 'deleteFromBasket',
      addToBasket: 'addToBasket'
    })
  },
  // DO NOTE! All this is installed to watch THE END PRICE, not the dollar course or dollar price;
  // Therefore you can change the real price in dollars, and it depending on the new price and dollar course
  // it might be colored differently from other goods
  watch: {
    rublePrice: {
      handler (newVal, oldVal) {
        if(newVal > oldVal) {
          this.priceClass = 'red'
        } else if (oldVal > newVal) {
          this.priceClass = 'green'
        } else {
          this.priceClass = 'neutral'
        }
      }
    }
  },
  filters: {
    dollarToRuble (dollar, course) {
      return parseFloat((Math.round((dollar * course) * 100) / 100).toFixed(2))
    }
  }
}
</script>

<style lang="scss" scoped>
.good {
  display: flex;
  width: 1500px;
  &.red {
    background-color: lightpink;
  }
  &.green {
    background-color: lightgreen;
  }
  &.neutral {
    background-color: transparent;
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
}


</style>
