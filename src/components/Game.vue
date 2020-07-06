<template>
  <div class="board-container">
    <h1 class="title">8-Puzzle Game</h1>
    <table class="board-table">
      <tbody>
        <Row
          v-for="(row, index) in board"
          :key="row.toString()"
          :row="row"
          :rowNumber="index"
          v-on:tile-clicked="onTileClicked"
        />
      </tbody>
    </table>
    <span class="game-state">
      {{ totalMoves }} Move{{ totalMoves !== 1 ? "s" : "" }}
    </span>
    <span class="game-state">{{ isSolved ? "Great Job ✅" : "" }}</span>
  </div>
</template>

<script>
import Row from "@/components/Row.vue";
import {
  getBoard,
  findBlank,
  isSamePoint,
  addPoints,
  swapPoints,
} from "@/assets/board";

const correctBoard = getBoard();

export default {
  data() {
    return {
      board: getBoard(true),
      totalMoves: 0,
    };
  },
  created() {
    this.blank = findBlank(this.board);
  },
  computed: {
    isSolved() {
      for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
          if (this.board[i][j] !== correctBoard[i][j]) return false;

      return true;
    },
  },
  methods: {
    onTileClicked(clickedTile) {
      if (isSamePoint(clickedTile, this.blank)) return; // do nothing
      const moves = [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: -1 },
        { x: 0, y: 1 },
      ];
      for (const move of moves) {
        // check if moving one step in horizontal or vertical direction from the clicked tile
        // leads to the blank tile
        const point = addPoints(clickedTile, move);
        if (isSamePoint(point, this.blank)) {
          swapPoints(this.board, clickedTile, this.blank);
          this.blank = clickedTile;
          this.totalMoves++;
          break;
        }
      }
    },
  },
  components: {
    Row,
  },
};
</script>

<style scoped>
.board-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-content: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  justify-items: center;
}

.board-table {
  border: 1px solid black;
  border-radius: 5px;
}

.title {
  color: #222;
}

.game-state {
  font-size: 20px;
  margin-top: 20px;
}
</style>
