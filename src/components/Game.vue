<template>
  <div class="board-container">
    <h1 class="title">8-Puzzle Game</h1>
    <table class="board-table" :class="{ solved: isSolved }">
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
    <div class="state-container game-state">
      <span>{{ timer }} Second{{ timer !== 1 ? "s" : "" }} </span>
      <span> {{ totalMoves }} Move{{ totalMoves !== 1 ? "s" : "" }} </span>
    </div>
    <span class="game-state green" v-if="isSolved">Great Job ✅</span>
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
      gameStarts: false,
      totalMoves: 0,
      timer: 0,
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
  watch: {
    gameStarts() {
      this.timer++;
    },
    timer() {
      setTimeout(() => {
        if (!this.isSolved && this.totalMoves) this.timer++;
      }, 1000);
    },
  },
  methods: {
    onTileClicked(clickedTile) {
      if (this.isSolved || isSamePoint(clickedTile, this.blank)) return; // do nothing
      this.gameStarts = true;
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
          this.$set(this.board, this.board); // trigger change in board (triggers isSolved)
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
  background-color: #222;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.state-container {
  margin: 0 auto;
  min-width: 300px;
  justify-content: space-around;
  display: flex;
}

.board-table {
  border: 1px solid black;
  border-radius: 5px;
}

.title {
  color: #ddd;
}

.solved {
  background-color: rgba(50, 255, 50, 0.2);
}

.green {
  color: rgb(0, 230, 0);
  text-shadow: 0.3px 0.3px #222;
}

.game-state {
  border-radius: 5px;
  background-color: #555;
  color: #ddd;
  padding: 10px;
  font-size: 20px;
  margin-top: 20px;
}
</style>
