import { useState, useEffect } from "react";
import { createStage } from "../helpers/createStage";

export const useStage = (shape, resetShape) => {
  const [stage, setStage] = useState(createStage);
  const [rowsCleared, setRowsCleared] = useState(0);
  const [mergedRows, setMergedRows] = useState([]);

  useEffect(() => {
    setRowsCleared(0);

    const sweepRows = (newStage) =>
      newStage.reduce((ack, row) => {
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          setRowsCleared((prev) => prev + 1);
          ack.unshift(new Array(newStage[0].length).fill([0, "clear"]));
          return ack;
        }
        ack.push(row);
        return ack;
      }, []);

    const updateStage = (prevStage) => {
      const newStage = prevStage.map((row) =>
        row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell))
      );

      shape.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + shape.pos.y][x + shape.pos.x] = [
              value,
              `${shape.collided ? "merged" : "clear"}`,
            ];
          }
        });
      });

      if (shape.collided) {
        stage.forEach((row, rowIndex) => {
          const hasMergedCells = row.every((cell) => cell[0] !== 0);
          if (hasMergedCells) {
            setMergedRows((prev) => [...prev, rowIndex]);
          }
        });
        resetShape();
        return sweepRows(newStage);
      }

      return newStage;
    };

    setStage((prev) => updateStage(prev));
  }, [shape]);

  return [stage, setStage, rowsCleared, mergedRows, setMergedRows];
};
