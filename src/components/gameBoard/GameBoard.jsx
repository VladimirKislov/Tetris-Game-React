import { useEffect, useState, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";

import Cell from "../cell/Cell";
import styles from "./style.module.scss";
import { color, randomColor } from "../../helpers/randomColor";

export default function GameBoard({ stage, mergedRows, setMergedRows }) {
  const [splitElements, setSplitElements] = useState([]);
  const containerRefs = useRef([]);

  useEffect(() => {
    if (mergedRows.length > 0) {
      const newSplitElements = [];
      mergedRows.forEach((rowIndex) => {
        const container = containerRefs.current[rowIndex];
        if (container) {
          const containerRect = container.getBoundingClientRect();
          for (let i = 0; i < 75; i++) {
            const randomX = Math.random() * containerRect.width + containerRect.left;
            const randomY = Math.random() * containerRect.height + containerRect.top;
            newSplitElements.push({ x: randomX, y: randomY });
          }
        }
      });

      setSplitElements(newSplitElements);

      const timeoutId = setTimeout(() => {
        setSplitElements((prevSplitElements) => {
          return prevSplitElements.map((element) => ({ ...element, shouldRemove: true }));
        });
        const removeTimeoutId = setTimeout(() => {
          setSplitElements([]);
          setMergedRows([]);
        }, 2000);
        return () => clearTimeout(removeTimeoutId);
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [mergedRows, setMergedRows]);

  return (
    <>
      {splitElements.map(({ x, y, shouldRemove }, index) => (
        <AnimatedSplitElement key={index} x={x} y={y} shouldRemove={shouldRemove} />
      ))}
      {stage.map((row, rowIndex) => (
        <div
          className={styles.container}
          ref={(ref) => (containerRefs.current[rowIndex] = ref)}
          key={rowIndex}
        >
          {row.map((x, cellIndex) => (
            <Cell x={x} color={color} key={cellIndex} />
          ))}
        </div>
      ))}
    </>
  );
}

function AnimatedSplitElement({ x, y, shouldRemove }) {
  const animationProps = useSpring({
    opacity: shouldRemove ? 0 : 1,
    transform: shouldRemove
      ? `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px)`
      : "translate(0px, 0px)",
    config: { tension: 100, friction: 20 },
  });

  return (
    <animated.div
      className={styles.splitElement}
      style={{
        ...animationProps,
        position: "absolute",
        left: x,
        top: y,
        width: "2px",
        height: "2px",
        backgroundColor: `rgb(${randomColor()})`,
        zIndex: "1000",
      }}
    />
  );
}
