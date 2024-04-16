const color = [
  "245, 37, 21",
  "255, 163, 0",
  "255, 255, 0",
  "17, 184, 17",
  "0, 188, 212",
  "166, 14, 202",
  "19, 36, 159",
];

const randomColor = () => {
  const randomIndex = Math.floor(Math.random() * color.length);
  return color[randomIndex];
};

export { color, randomColor };