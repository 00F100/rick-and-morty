<template>
  <div id="loader">
    <img src="../assets/loader.gif" />
    <div class="message">
      {{ $t('Loading...') }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Loader",
};
</script>

<style scoped lang="scss">
@import '../styles/quasar.variables.sass';
#loader {
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: #000;
  // opacity: 0.8;
  z-index: 9999;
  text-align: center;

  img {
    margin-top: 10%;
    max-width: 50%;
  }
  .message{
    color: #FFF
  }
}

@media (max-width: $breakpoint-xs-max) {
  #loader {
    img {
      margin-top: 30%;
      max-width: 80%;
    }
  }
}
@media (min-width: $breakpoint-sm-min) and (max-width: $breakpoint-sm-max) {
  #loader {
    img {
      margin-top: 5%;
    }
  }
}
</style>