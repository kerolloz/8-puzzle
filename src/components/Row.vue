<template>
  <tr>
    <Tile
      v-for="(tile, index) in row"
      :tileName="tile"
      :key="tile"
      :rowNumber="rowNumber"
      :columnNumber="index"
      v-on:tile-clicked="$emit('tile-clicked', $event)"
    />
  </tr>
</template>

<script>
import Tile from "@/components/Tile.vue";

export default {
  props: {
    row: {
      type: Array,
      required: true,
    },
    rowNumber: {
      type: Number,
      required: true,
    },
  },
  components: {
    Tile,
  },
};
</script>

<style scoped></style>
