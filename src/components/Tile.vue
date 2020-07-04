<template>
  <td
    class="tile"
    :row-number="rowNumber"
    :column-number="columnNumber"
    @click="$emit('tile-clicked', { x: rowNumber, y: columnNumber })"
    :class="{ 'blank-tile': tileName === '' }"
  >
    {{ tileName }}
  </td>
</template>

<script>
export default {
  props: {
    tileName: {
      type: String,
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
