<template>
  <div class="goods">
    <div
        class="goods__container"
        v-if="Object.keys(goods).length"
    >
      <div
          v-for="(category, i) in Object.keys(goods)"
          :key="i"
          class="goods__block"
      >
        <div class="goods__category banner">
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
    <Loader
        v-else
    />
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
  }
}
</script>

<style lang="scss" scoped>
.goods {
  display: flex;
  width: 1200px;

  &__container {
    width: 100%;
    opacity: 1;
    transition: all 5s ease-in-out;
  }

  &__block {
    width: 100%;
    margin: 10px 0;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    background-color: #e4e8ea;
    padding: 20px;
  }

  &__category {
    font-size: 20px;
    font-weight: bold;
  }

  &__loader {
    width: 100%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}


</style>
