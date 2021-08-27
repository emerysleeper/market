<template>
  <div
      class="good"
      :class="priceClass"
  >
      <div class="good__name">
        <p>{{ good.itemName }} </p>
      </div>
<!--    Вид товаров для корзины -->
    <div
        v-if="mode === 'basket'"
        class="good__info"
    >
        <p>Цена/шт - {{ rublePrice }} р </p>
        <p v-show="good.amount > 1">Цена за {{ good.amount }} шт. - {{ rublePrice * good.amount | fixedNum }} р </p>
        <p>Количество - {{ good.quantity }} </p>
      <Amount :amount="good.amount" :id="id" />
      <div

          class="button"
          @click="deleteGood(id)"
      >
        <p>Удалить из корзины</p>
      </div>
    </div>
<!--    Вид товара для списка товаров -->
    <div
        v-else
        class="good__info"
    >
      <p>Цена - {{ good.price | dollarToRuble(dollarCourse) }} </p>
      <p>Количество - {{ good.quantity }} </p>
      <div
          class="good__add button"
          @click="addToBasket({ name: good.groupName, id: good.itemId })"
      >
        <p>В корзину</p>
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
    //Turning price to rubles, also making sure it won't be something like 1.00000000004
    rublePrice () {
      return parseFloat((Math.round((this.good.price * this.dollarCourse) * 100) / 100).toFixed(2))
    }
  },
  methods: {
    ...mapActions({
      deleteFromBasket: 'deleteFromBasket',
      addToBasket: 'addToBasket'
    }),
    ...mapActions('popup', {
      setPopupMode: 'setPopupMode',
      setItemToDelete: 'setItemToDelete'
    }),
    deleteGood (id) {
      this.setItemToDelete(id)
      this.setPopupMode('Delete')
    }
  },
  // DO NOTE! All this is installed to watch THE END PRICE, not the dollar course or dollar price;
  // Therefore you can change the real price in dollars, and it depending on the new price and dollar course
  // it might be colored differently from other goods
  watch: {
    rublePrice: {
      handler (newVal, oldVal) {
        if (this.mode === 'basket') {
          if(newVal > oldVal) {
            this.priceClass = 'red'
          } else if (oldVal > newVal) {
            this.priceClass = 'green'
          } else {
            this.priceClass = 'neutral'
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.good {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  border: 1px solid lightslategrey;
  &.red {
    background-color: lightpink;
  }
  &.green {
    background-color: lightgreen;
  }
  &.neutral {
    background-color: transparent;
  }

  &__name {
    width: 600px;
    padding: 10px;
  }
  &__info {
    border-left: 1px solid black;
    width: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    padding: 10px;

    p {
      margin: 3px 0;
    }
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
