import React from "react";
import styles from "./style.module.scss";

export default function Screen({ title, text }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.text}>{text}</div>
    </div>
  );
}
