import { useState } from "react";

import { TETROMINOS, randomTetromino } from "../components/tetrominos/Tetrominos";
import checkCollision from "../components/checkCollision/CheckCollision";

export const useShape = () => {
  const [shape, setShape] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  const updateShapePos = ({ x, y, collided }) => {
    setShape((prev) => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided,
    }));
  };

  const resetShape = () => {
    setShape({
      pos: { x: 10 / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false,
    });
  };

  function rotate(matrix, dir) {
    const mtrx = matrix.map((_, index) => matrix.map((column) => column[index]));
    if (dir > 0) return mtrx.map((row) => row.reverse());
    return mtrx.reverse();
  }

  function shapeRotate(stage, dir) {
    const clonedShape = JSON.parse(JSON.stringify(shape));
    clonedShape.tetromino = rotate(clonedShape.tetromino, dir);

    const pos = clonedShape.pos.x;
    let offset = 1;
    while (checkCollision(clonedShape, stage, { x: 0, y: 0 })) {
      clonedShape.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedShape.tetromino[0].length) {
        rotate(clonedShape.tetromino, -dir);
        clonedShape.pos.x = pos;
        return;
      }
    }
    setShape(clonedShape);
  }

  return [shape, updateShapePos, resetShape, shapeRotate];
};
