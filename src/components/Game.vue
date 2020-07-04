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
          v-on:tile-clicked="onClick"
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

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function getBoard(shuffled = false) {
  const allNums = Array.from({ length: 8 }, (x, i) =>
    (i + 1).toString()
  ).concat("");

  if (shuffled) {
    shuffleArray(allNums);
  }

  const gameBoard = [];
  let row = [];
  let i = 1;
  for (const e of allNums) {
    row.push(e);
    if (i == 3) {
      i = 0;
      gameBoard.push(row);
      row = [];
    }
    i++;
  }

  return gameBoard;
}

const correctBoard = getBoard();

const samePoint = (a, b) => {
  return a.x == b.x && a.y == b.y;
};

const addPoints = (a, b) => {
  return { x: a.x + b.x, y: a.y + b.y };
};

const findBlank = (board) => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == "") return { x: i, y: j };
    }
  }
  return { x: 1, y: 1 };
};

export default {
  data() {
    return {
      board: getBoard(true),
      blank: { x: 0, y: 0 },
      totalMoves: 0,
    };
  },
  created() {
    this.blank = findBlank(this.board);
  },
  computed: {
    isSolved() {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (this.board[i][j] !== correctBoard[i][j]) return false;
        }
      }
      return true;
    },
  },
  methods: {
    onClick(e) {
      if (samePoint(e, this.blank)) return;
      const moves = [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: -1 },
        { x: 0, y: 1 },
      ];
      for (const move of moves) {
        // moving one step in horizontal or vertical direction from the clicked point leads to blank
        const possiblePoint = addPoints(e, move);
        if (samePoint(possiblePoint, this.blank)) {
          // then swap blank and the clicked point
          // swap points
          [this.board[e.x][e.y], this.board[this.blank.x][this.blank.y]] = [
            this.board[this.blank.x][this.blank.y],
            this.board[e.x][e.y],
          ];
          // using this.$set() because Vue can't trigger changes made by assigning individual indexes for an array
          this.$set(this.board, e.x, this.board[e.x]); // change the row of clicked element
          this.$set(this.board, this.blank.x, this.board[this.blank.x]); // change the row of blank element
          // let blank equals the new point
          this.blank = e;
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
