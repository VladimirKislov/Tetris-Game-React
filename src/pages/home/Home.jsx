import { useState, useEffect, useContext } from "react";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>TETRIS</h2>
      <p className={styles.description}>
        Tetris - классическая аркадная игра, которая завоевала миллионы сердец по всему миру. В этой
        захватывающей головоломке ваша задача - управлять падающими геометрическими фигурами,
        называемыми тетрамино, для заполнения горизонтальных линий на игровом поле. Цель игры -
        заполнять линии без пропусков, чтобы они исчезали, освобождая место для следующих фигур.
        Постепенно игра становится все сложнее, когда фигуры начинают падать быстрее, и ваша реакция
        и стратегическое мышление становятся настоящим испытанием.
      </p>
      <Link to="/tetris-to-play" className={styles.link}>
        Играть
      </Link>
    </div>
  );
}
