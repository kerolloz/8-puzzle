/**
 * only works when arr.length is divisble by chunkSize
 * @param {Array} arr the array you want to divide into array of subarrays of size chunkSize
 * @param {Number} chunkSize the size of subarray
 */
function chunk(arr, chunkSize) {
  for (let i = 0; i < chunkSize; i++) arr.push(arr.splice(0, chunkSize));
  return arr;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function swapPoints(board, a, b) {
  [board[a.x][a.y], board[b.x][b.y]] = [board[b.x][b.y], board[a.x][a.y]];
}

export const BLANK_NUMBER = 9;

export function getBoard(shuffled = false) {
  const board = Array.from({ length: 9 }, (_, i) => i + 1);
  if (shuffled) shuffleArray(board);
  return chunk(board, 3);
}

export const isSamePoint = (a, b) => {
  return a.x == b.x && a.y == b.y;
};

export const addPoints = (a, b) => {
  return { x: a.x + b.x, y: a.y + b.y };
};

export const findBlank = (board) => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == BLANK_NUMBER) return { x: i, y: j };
    }
  }
};
