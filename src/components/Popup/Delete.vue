<template>
  <div class="delete">
    <p  class="delete__ask">Вы уверены что хотите удалить следующий товар?</p>
    <p  class="delete__name">{{ basket[itemId].itemName }}</p>
    <div  class="delete__controls">
      <div
          @click="confirmDelete"
          class="button">
        <p>Да</p>
      </div>
      <div
          @click="preventDelete"
          class="button">
        <p>Нет</p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'Delete',
  computed: {
    ...mapGetters({
      basket: 'getBasket'
    }),
    ...mapGetters('popup', {
      itemId: 'getItemId'
    })
  },
  methods: {
    ...mapActions('popup', {
      setPopupMode: 'setPopupMode',
      setItemToDelete: 'setItemToDelete'
    }),
    ...mapActions({
      deleteFromBasket: 'deleteFromBasket'
    }),
    preventDelete() {
      this.setItemToDelete(null)
      this.setPopupMode(null)
    },
    confirmDelete() {
      this.deleteFromBasket(this.basket[this.itemId].itemId)
      this.setItemToDelete(null)
      this.setPopupMode(null)
    }
  }
}
</script>

<style lang="scss" scoped>
.delete {
  padding: 20px;

  &__ask {
    font-size: 22px;
    font-weight: bold;
  }

  &__name {
    background-color: #e4e8ea;
  }

  &__controls {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
}
</style>
