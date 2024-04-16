export const TETROMINOS = {
  0: { shape: [[0]] },
  1: {
    shape: [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
  },
  2: {
    shape: [
      [0, 2, 0],
      [0, 2, 0],
      [2, 2, 0],
    ],
  },
  3: {
    shape: [
      [0, 3, 0],
      [0, 3, 0],
      [0, 3, 3],
    ],
  },
  4: {
    shape: [
      [4, 4],
      [4, 4],
    ],
  },
  5: {
    shape: [
      [0, 5, 5],
      [5, 5, 0],
      [0, 0, 0],
    ],
  },
  6: {
    shape: [
      [0, 0, 0],
      [6, 6, 6],
      [0, 6, 0],
    ],
  },
  7: {
    shape: [
      [7, 7, 0],
      [0, 7, 7],
      [0, 0, 0],
    ],
  },
};

export const randomTetromino = () => {
  const tetro = "1234567";
  const randTetromino = tetro[Math.floor(Math.random() * tetro.length)];
  return TETROMINOS[randTetromino];
};
