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
          <p>Цена - {{ good.price | dollarToRuble(dollarCourse) }} </p>
          <p>Цена - {{ good.price }} </p>
          <p>Количество - {{ good.quantity }} </p>
        </div>
        <div>
          <input v-model="quantity" />
        </div>
        <div
            class="basket__delete"
            @click="deleteFromBasket(good.itemId)"
        >
          <p>Удалить из корзины</p>
        </div>
      </div>
    </div>
    <p v-else>Товаров пока нет</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Goods',
  methods: {
    ...mapActions({
      deleteFromBasket: 'deleteFromBasket'
    })
  },
  computed: {
    ...mapGetters({
      basket: 'getBasket',
      dollarCourse: 'getDollarCourse'
    })
  },
  filters: {
    dollarToRuble (dollar, course) {
      return Math.round(((dollar * course) + Number.EPSILON) * 100) / 100
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
    flex-direction: column;
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
}
</style>
