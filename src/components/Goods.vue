<template>
  <div class="goods">
    <div v-if="goods">
      <div
          v-for="(category, i) in Object.keys(goods)"
          :key="i"
          class="goods__block"
      >
        <div class="goods__category">
          {{ category }}
        </div>
        <div
            v-for="good in goods[category]"
            :key="good.itemId"
            class="goods__good"
        >
          <div class="goods__name">
            <p>Название - {{ good.itemName }} </p>
          </div>
          <div class="goods__info">
            <p>Цена - {{ good.price | dollarToRuble(dollarCourse) }} </p>
            <p>Цена - {{ good.price }} </p>
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
      addToBasket: 'addToBasket'
    })
  },
  computed: {
    ...mapGetters({
      goods: 'getCurGoods',
      dollarCourse: 'getDollarCourse'
    })
  },
  filters: {
    dollarToRuble (dollar, course) {
      return parseFloat((Math.round((dollar * course) * 100) / 100).toFixed(2))
      // return dollar
    }
  }
}
</script>

<style lang="scss" scoped>
.goods {
  display: flex;

  &__block {
    display: flex;
    flex-direction: column;
    width: fit-content;
  }

  &__category {
    color: red;
  }

  &__good {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  &__name {
    width: 400px;
  }

  &__info {
    width: 400px;
    display: flex;
    justify-content: space-between;
  }

  &__add {
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
