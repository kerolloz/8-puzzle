<template>
  <td
    class="tile"
    :row-number="rowNumber"
    :column-number="columnNumber"
    @click="$parent.$emit('tile-clicked', { x: rowNumber, y: columnNumber })"
    :class="{ 'blank-tile': tileNumber === BLANK_NUMBER }"
  >
    {{ tileNumber === BLANK_NUMBER ? "" : tileNumber }}
  </td>
</template>

<script>
import { BLANK_NUMBER } from "@/assets/board";

export default {
  data() {
    return { BLANK_NUMBER };
  },
  props: {
    tileNumber: {
      type: Number,
      required: true,
    },
    rowNumber: {
      type: Number,
      required: true,
    },
    columnNumber: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.tile {
  padding: 40px;
  font-size: 30px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
  user-select: none;
  cursor: pointer;
}

.tile:hover:not(.blank-tile) {
  background-color: #222;
}

.blank-tile {
  background-color: #444;
}
</style>
