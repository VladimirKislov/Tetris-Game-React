export const updateDropTime = (level, isAcceleration) => {
  if (isAcceleration) {
    return 100;
  } else if (level > 1) {
    return 1000 - 100 * level;
  } else {
    return 1000;
  }
}
