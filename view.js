import { fetchMaze } from "./model.js";
window.addEventListener("load", main);

async function main() {
  const mazeInfo = await fetchMaze();

  displayMaze(mazeInfo);
}

function displayMaze(mazeInfo) {
  const gridElement = document.querySelector("#grid");
  gridElement.style.setProperty(
    "grid-template-columns",
    `repeat(${mazeInfo.cols}, max-content)`
  );
  gridElement.style.setProperty(
    "grid-template-rows",
    `repeat(${mazeInfo.rows}, max-content)`
  );
  gridElement.innerHTML = "";

  for (let row = 0; row < mazeInfo.rows; row++) {
    for (let col = 0; col < mazeInfo.cols; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      const cellInfo = mazeInfo.maze[row][col];
      const cellStart = mazeInfo.start;
      const cellGoal = mazeInfo.goal;
      if (!cellInfo.north) cell.classList.add("no-north");
      if (!cellInfo.east) cell.classList.add("no-east");
      if (!cellInfo.west) cell.classList.add("no-west");
      if (!cellInfo.south) cell.classList.add("no-south");

      if (row === cellStart.row && col === cellStart.col) {
        cell.classList.add("start");
      }
      if (row === cellGoal.row && col === cellGoal.col) {
        cell.classList.add("goal");
      }

      gridElement.appendChild(cell);
    }
  }
}
