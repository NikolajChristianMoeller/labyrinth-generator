export class Grid {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.grid = this.createGrid();
  }

  createGrid() {
    const grid = [];
    for (let row = 0; row < this.rows; row++) {
      const currentRow = [];
      for (let col = 0; col < this.cols; col++) {
        currentRow.push({
          row: row,
          col: col,
          north: true,
          east: true,
          west: true,
          south: true,
        });
      }
      grid.push(currentRow);
    }
    return grid;
  }

  removeWall(row, col, direction) {
    const cell = this.get(row, col);
    cell[direction] = false;
    this.set(row, col, cell);

    // Remove the corresponding wall in the adjacent cell
    if (direction === "north" && row > 0) {
      this.grid[row - 1][col].south = false;
    } else if (direction === "south" && row < this.rows - 1) {
      this.grid[row + 1][col].north = false;
    } else if (direction === "east" && col < this.cols - 1) {
      this.grid[row][col + 1].west = false;
    } else if (direction === "west" && col > 0) {
      this.grid[row][col - 1].east = false;
    }
  }

  toJSON() {
    return {
      rows: this.rows,
      cols: this.cols,
      maze: this.grid,
    };
  }

  get(row, col) {
    let value = this.grid[row][col];
    return value;
  }

  set(row, col, value) {
    this.grid[row][col] = value;
  }

  indexFor(row, col) {
    return row * this.cols + col;
  }

  rowColFor(index) {
    const row = Math.floor(index / this.cols);
    const col = index % this.rows;
    return this.grid[row][col];
  }

  neighbours(row, col) {
    if (row > this.rows.length && col > this.cols.length) {
      return undefined;
    }

    if (row === 0 && col === 0) {
      let neighbours = [this.south(row, col), this.east(row, col)];
      return neighbours;
    } else if (row === 0 && col === this.cols.length) {
      let neighbours = [this.south(row, col), this.west(row, col)];
      return neighbours;
    } else if (row === this.rows.length && col === 0) {
      let neighbours = [this.north(row, col), this.east(row, col)];
      return neighbours;
    } else if (row === this.rows.length && col === this.cols.length) {
      let neighbours = [this.north(row, col), this.west(row, col)];
      return neighbours;
    } else if (row === 0) {
      let neighbours = [
        this.south(row, col),
        this.east(row, col),
        this.west(row, col),
      ];
      return neighbours;
    } else if (row === this.rows.length) {
      let neighbours = [
        this.north(row, col),
        this.east(row, col),
        this.west(row, col),
      ];
      return neighbours;
    } else if (col === 0) {
      let neighbours = [
        this.north(row, col),
        this.south(row, col),
        this.east(row, col),
      ];
      return neighbours;
    } else if (col === this.cols.length) {
      let neighbours = [
        this.north(row, col),
        this.south(row, col),
        this.west(row, col),
      ];
      return neighbours;
    } else {
      let neighbours = [];

      let north = this.north(row, col);
      let south = this.south(row, col);
      let west = this.west(row, col);
      let east = this.east(row, col);

      neighbours.push(north, south, east, west);

      return neighbours;
    }
  }

  neighboursCount(row, col) {
    if (
      row >= this.rows.length ||
      col >= this.cols.length ||
      row < 0 ||
      col < 0
    ) {
      return undefined;
    }

    let neighbours = [];

    let north = this.north(row, col);
    let north_west = this.grid[row - 1][col - 1];
    let north_east = this.grid[row - 1][col + 1];
    let south_west = this.grid[row + 1][col - 1];
    let south_east = this.grid[row + 1][col + 1];
    let south = this.south(row, col);
    let west = this.west(row, col);
    let east = this.east(row, col);

    neighbours.push(
      north,
      south,
      east,
      west,
      north_west,
      north_east,
      south_east,
      south_west
    );

    let count = 0;
    for (const neighbour of neighbours) {
      if (neighbour !== undefined) {
        count++;
      }
    }
    return count;
  }

  neighboursValue(row, col) {
    if (row > this.rows.length && col > this.cols.length) {
      return undefined;
    }

    let neighbours = [];

    let north = this.north(row, col);
    let north_west = this.grid[row - 1][col - 1];
    let north_east = this.grid[row - 1][col + 1];
    let south_west = this.grid[row + 1][col - 1];
    let south_east = this.grid[row + 1][col + 1];
    let south = this.south(row, col);
    let west = this.west(row, col);
    let east = this.east(row, col);

    neighbours.push(
      north,
      south,
      east,
      west,
      north_west,
      north_east,
      south_east,
      south_west
    );

    let interator = neighbours.values();
    for (const value of interator) {
      console.log(value);
    }
  }

  nextInRow(row, col) {
    if (row > this.rows.length && col > this.cols.length) {
      return undefined;
    }
    let value = this.grid[row][col - 1];
    return value;
  }

  north(row, col) {
    if (row - 1 < 0) {
      return undefined;
    }
    let value = this.grid[row - 1][col];
    return value;
  }

  south(row, col) {
    if (row > this.rows.length && col > this.cols.length) {
      return undefined;
    }
    let value = this.grid[row + 1][col];
    return value;
  }

  west(row, col) {
    if (row > this.rows.length && col > this.cols.length) {
      return undefined;
    }
    let value = this.grid[row][col - 1];
    return value;
  }
  east(row, col) {
    if (row > this.rows.length && col > this.cols.length) {
      return undefined;
    }
    let value = this.grid[row][col + 1];
    return value;
  }

  row() {
    return this.rows;
  }

  col() {
    return this.cols;
  }

  size() {
    return this.rows * this.cols;
  }

  fill(value) {
    for (let row = 0; row < this.row(); row++) {
      for (let col = 0; col < this.col(); col++) {
        this.grid[row][col] = value;
      }
    }
  }

  dump() {
    console.table(this.grid);
  }
}
