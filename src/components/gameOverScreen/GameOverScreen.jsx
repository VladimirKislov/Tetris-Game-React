import React from "react";
import { Link } from "react-router-dom";

import styles from "./style.module.scss";

export default function GameOverScreen({ gameOver, newGame }) {
  return (
    <>
      {gameOver && (
        <div className={styles.container}>
          <div className={styles.game_over}>
            <h2 className={styles.game_over__title}>Game Over</h2>
            <button className={styles.game_over__btn__start} onClick={() => newGame()}>
              New Game
            </button>
            <Link className={styles.game_over__btn__exit} to={"/"}>
              Exit
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
