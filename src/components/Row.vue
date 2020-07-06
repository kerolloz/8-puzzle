<template>
  <tr>
    <Tile
      v-for="(tile, index) in row"
      :tileNumber="tile"
      :key="tile"
      :rowNumber="rowNumber"
      :columnNumber="index"
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
