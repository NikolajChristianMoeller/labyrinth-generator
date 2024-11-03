import { Grid } from "./grid.js";

async function fetchMaze() {
  const res = await fetch("./maze.json");
  const mazeInfo = await res.json();
  return mazeInfo;
}

async function createGrid() {
  const mazeInfo = await fetchMaze();
  const grid = new Grid(mazeInfo.rows, mazeInfo.cols);
  for (let row = 0; row < mazeInfo.maze.length; row++) {
    for (let col = 0; col < mazeInfo.maze[row].length; col++) {
      const cell = mazeInfo.maze[row][col];
      cell.isVisited = false;
      grid.set(row, col, cell);
    }
  }

  grid.dump();
  return grid;
}

export { fetchMaze, createGrid };
