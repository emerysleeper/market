<template>
  <div class="goods">
    <div v-if="Object.keys(goods).length">
      <div
          v-for="(category, i) in Object.keys(goods)"
          :key="i"
          class="goods__block"
      >
        <div class="goods__category">
          {{ category }}
        </div>
        <Good
            v-for="(good, i) in goods[category]"
            :key="i"
            :good="good"
            :id="i"
        />
      </div>
    </div>
    <Loader v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loader from "@/components/UI/Loader";
import Good from "@/components/UI/Good"
export default {
  name: 'Goods',
  components: {
    Good,
    Loader
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
