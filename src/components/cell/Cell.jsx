import React, { useMemo, useState } from "react";
import styles from "./style.module.scss";

export default function Cell({ x, color }) {
  const [colors, setColor] = useState("");

  useMemo(() => {
    if (x[0] === 1) {
      setColor(color[0]);
    } else if (x[0] === 2) {
      setColor(color[1]);
    } else if (x[0] === 3) {
      setColor(color[2]);
    } else if (x[0] === 4) {
      setColor(color[3]);
    } else if (x[0] === 5) {
      setColor(color[4]);
    } else if (x[0] === 6) {
      setColor(color[5]);
    } else if (x[0] === 7) {
      setColor(color[6]);
    }
  }, [x]);

  return (
    <span
      className={styles.shape}
      style={{
        background: x[0] !== 0 ? `rgba(${colors}, 1) content-box` : "transparent",
        boxShadow:
          x[0] !== 0
            ? "inset 0px 0px 4px 2px rgba(0,0,0,0.5), inset 0px 0px 4px 0px rgba(0,0,0,0.5)"
            : "",
      }}
    />
  );
}
