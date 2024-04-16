import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";

import { useShape } from "../../hooks/useShape";
import { useStage } from "../../hooks/useStage";
import { useInterval } from "../../hooks/useInterval";
import { useProgress } from "../../hooks/useProgress";

import GameBoard from "../../components/gameBoard/GameBoard";
import checkCollision from "../../components/checkCollision/CheckCollision";
import Screen from "../../components/screen/Screen";
import GameOverScreen from "../../components/gameOverScreen/GameOverScreen";

import { createStage } from "../../helpers/createStage";
import { updateDropTime } from "../../helpers/updateDropTime";

export default function Game() {
  const [shape, updateShapePos, resetShape, shapeRotate] = useShape();
  const [stage, setStage, rowsCleared, mergedRows, setMergedRows] = useStage(shape, resetShape);
  const [level, score, setLevel, setScore] = useProgress(rowsCleared);

  const [isAcceleration, setIsAcceleration] = useState(false);
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [gamePause, setGamePause] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [disabledControl, setDisabledControl] = useState(false);

  const moveShape = (dir) => {
    if (!checkCollision(shape, stage, { x: dir, y: 0 })) {
      updateShapePos({ x: dir, y: 0 });
    }
  };

  const drop = () => {
    if (!checkCollision(shape, stage, { x: 0, y: 1 })) {
      updateShapePos({ x: 0, y: 1, collided: false });
    } else {
      if (shape.pos.y < 1) {
        console.log("GAME OVER!!!");
        setLevel(1);
        setScore(0);
        setGameOver(true);
        setDropTime(null);
        setStage(createStage);
      } else {
        updateShapePos({ x: 0, y: 0, collided: true });
      }
    }
  };

  const startGame = () => {
    setDisabled(true);
    resetShape();
    setDropTime(1000);
  };

  useEffect(() => {
    if (gamePause) {
      setDropTime(100000 * 100000);
      setDisabledControl(true);
    } else {
      setDropTime(updateDropTime(level, isAcceleration));
      setDisabledControl(false);
    }
  }, [gamePause, level, isAcceleration]);

  const clickMove = (props) => {
    if (!gameOver) {
      if (props === "left") {
        return moveShape(-1);
      } else if (props === "right") {
        return moveShape(1);
      } else if (props === "rotate") {
        return shapeRotate(stage, 1);
      } else if (props === "pause") {
        return setDropTime(100000 * 100000);
      }
    }
  };

  const handleStartClick = () => {
    setIsAcceleration(true);
  };

  const handleEndClick = (event) => {
    event.preventDefault();
    setIsAcceleration(false);
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>TETRIS GAME</h2>
      <div className={styles.wrapper__board}>
        <div className={styles.box__board}>
          <GameBoard stage={stage} mergedRows={mergedRows} setMergedRows={setMergedRows} />
        </div>
        <div className={styles.screen}>
          <div className={styles.screen__box_scr}>
            <Screen title="Score" text={score} />
            <Screen title="Level" text={level} />
            <Screen title="Speed" text={dropTime > 1000 ? 0 : dropTime} />
          </div>
          <div className={styles.screen__box_btn}>
            <button
              className={styles.screen__box_btn_start}
              onClick={() => startGame()}
              disabled={disabled}
            >
              Start
            </button>
            <button
              className={styles.screen__box_btn_pause}
              onClick={() => setGamePause(!gamePause)}
            >
              {!gamePause ? "Pause" : "Continue"}
            </button>
            <Link className={styles.screen__box_btn_exit} to={"/"}>
              Exit
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.container__button}>
        <button
          className={styles.container__button__move}
          onClick={() => clickMove("left")}
          disabled={disabledControl}
        >
          Влево
        </button>
        <button
          className={styles.container__button__central}
          onClick={() => clickMove("rotate")}
          disabled={disabledControl}
        >
          Повернуть
        </button>
        {!gameOver && disabled && (
          <button
            className={styles.container__button__central}
            onMouseDown={handleStartClick}
            onMouseUp={handleEndClick}
            onTouchStart={handleStartClick}
            onTouchEnd={handleEndClick}
            disabled={disabledControl}
          >
            Ускорение
          </button>
        )}
        <button
          className={styles.container__button__move}
          onClick={() => clickMove("right")}
          disabled={disabledControl}
        >
          Вправо
        </button>
      </div>
      <GameOverScreen
        gameOver={gameOver}
        newGame={() => {
          setGameOver(false);
          setDisabled(false);
        }}
      />
    </div>
  );
}
