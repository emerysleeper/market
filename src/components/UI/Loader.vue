<template>
  <div class="loader">
    <div class="loader__container">
      <img src="@/assets/loading.svg" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader'
}
</script>

<style lang="scss" scoped>
.loader {
  width: 100%;
  height: 300px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  &__container {
    width: 80px;
    height: 80px;
    background-color: mediumseagreen;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      animation: rotation .7s infinite linear;
    }
  }
}

@keyframes rotation {
  from {
    transform: rotate(364deg);
  }
  to {
    transform: rotate(0deg);
  }
}
</style>
