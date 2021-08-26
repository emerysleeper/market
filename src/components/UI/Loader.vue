<template>
  <div class="loader">
    <img src="@/assets/loading.svg" />
  </div>
</template>

<script>
export default {
  name: 'Loader'
}
</script>

<style lang="scss" scoped>
.loader {
  width: 50px;
  height: 50px;
  background-color: aqua;
  border-radius: 100%;
  img {
    width: 50px;
    height: 50px;
    animation: rotation .7s infinite linear;
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
