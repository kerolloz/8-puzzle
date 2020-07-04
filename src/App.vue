<template>
  <div id="app">
    <Game />
  </div>
</template>

<script lang="ts">
import Game from "./components/Game.vue";

export default {
  components: {
    Game,
  },
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  height: 100%;
  width: 100%;
}
</style>
