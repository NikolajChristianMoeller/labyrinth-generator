import { Grid } from "./grid.js";

window.addEventListener("load", main);

function main() {
  document.querySelector("#create").addEventListener("click", generate);
}

function generate() {
  const rows = parseInt(document.querySelector("#rows").value);
  const cols = parseInt(document.querySelector("#cols").value);
  const grid = new Grid(rows, cols);
  console.log(grid);
  SideWinder(grid);
  gridToJson(grid);
}

function KruskalAlgorithm(grid) {
  // lav en liste over alle vægge i labyrinten
  let walls = [];
  for (let row = 0; row < grid.rows; row++) {
    for (let col = 0; col < grid.cols; col++) {
      if (col < grid.cols - 1) {
        walls.push({ row, col, direction: "east" });
      }
      if (row < grid.rows - 1) {
        walls.push({ row, col, direction: "south" });
      }
      // if (col > 0) {
      //     walls.push({ row, col, direction: "west" });
      // }
      // if (row > 0) {
      //     walls.push({ row, col, direction: "north" });
      // }
    }
  }

  console.log(walls);

  // lav et sæt for hver celle i labyrinten, med cellen som eneste element
  let count = -1;
  for (let row = 0; row < grid.rows; row++) {
    for (let col = 0; col < grid.cols; col++) {
      count++;
      grid.set(row, col, count);
    }
  }

  // for hver væg i en tilfældig rækkefølge
  const shuffledWalls = walls.sort(() => Math.random() - 0.5);
  for (const wall of shuffledWalls) {
    console.log(wall);
  }

  // hvis cellen divideret af denne væg høre til et distinkt sæt

  // fjern væggen og foren de to sæt

  console.log(grid);
}

function SideWinder(grid) {
  for (let row = 0; row < grid.rows - 1; row++) {
    let run = [];
    for (let col = 0; col < grid.cols; col++) {
      run.push(grid.get(row, col));
      const atEasternBoundary = col === grid.cols - 1;
      const atNorthernBoundary = row === 0;
      const shouldCloseOut =
        atEasternBoundary || (!atNorthernBoundary && Math.random() < 0.5);

      if (shouldCloseOut) {
        const member = run[Math.floor(Math.random() * run.length)];
        if (member.row > 0) {
          grid.removeWall(member.row, member.col, "north");
        }
        run = [];
      } else {
        grid.removeWall(row, col, "east");
      }
    }
  }

  // Handle the last row
  for (let col = 0; col < grid.cols; col++) {
    if (grid.get(grid.rows - 1, col).north) {
      grid.removeWall(grid.rows - 1, col, "north");
    }
  }
}

function gridToJson(grid) {
  const mazeToJson = grid.toJSON();
  mazeToJson.start = { row: 0, col: 0 };
  mazeToJson.goal = { row: 1, col: 3 };
  console.log(JSON.stringify(mazeToJson, null, 2));
}
