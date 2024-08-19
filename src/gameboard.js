import Ship from "./ship"

class Gameboard {
  constructor() {
    this.rows = 15
    this.cols = 15
    this.board = this.createEmpty2DArray(this.rows, this.cols)
    this.ships = [
      new Ship(5, "Carrier"),
      new Ship(4, "Battleship"),
      new Ship(4, "Battleship"),
      new Ship(3, "Destroyer"),
      new Ship(3, "Destroyer"),
      new Ship(3, "Destroyer"),
      new Ship(1, "Submarine"),
      new Ship(1, "Submarine"),
      new Ship(1, "Submarine"),
      new Ship(1, "Submarine"),
      new Ship(2, "Patrol Boat"),
      new Ship(2, "Patrol Boat"),
      new Ship(2, "Patrol Boat"),
    ]

    this.placeAllShipsRandomly()
  }

  getDimension() {
    return [this.rows, this.cols]
  }

  getShips() {
    return this.ships
  }

  createEmpty2DArray(rows, cols) {
    return Array.from({ length: rows }, () => Array(cols).fill(null))
  }

  placeAllShipsRandomly() {
    this.ships.forEach((ship) => {
      let placed = false
      while (!placed) {
        const orientation = Math.random() < 0.5 ? "horizontal" : "vertical"
        const x = Math.floor(
          Math.random() *
            (orientation === "horizontal"
              ? this.rows
              : this.rows - ship.length + 1)
        )
        const y = Math.floor(
          Math.random() *
            (orientation === "vertical"
              ? this.cols
              : this.cols - ship.length + 1)
        )
        if (this.canPlaceShip(x, y, ship.length, orientation)) {
          this.placeShip(ship, { x, y }, orientation)
          placed = true
        }
      }
    })
  }

  canPlaceShip(x, y, length, orientation) {
    // Ensure the ship won't go out of bounds
    if (orientation === "horizontal" && x + length > this.rows) {
      return false
    }
    if (orientation === "vertical" && y + length > this.cols) {
      return false
    }

    // Check if the space is free
    for (let i = 0; i < length; i++) {
      if (orientation === "horizontal") {
        if (this.board[x + i][y] !== null) {
          return false
        }
      } else {
        if (this.board[x][y + i] !== null) {
          return false
        }
      }
    }
    return true
  }

  placeShip(ship, coordinates, orientation) {
    const { x, y } = coordinates

    if (this.isWithinBounds(x, y, ship.length, orientation)) {
      for (let i = 0; i < ship.length; i++) {
        if (orientation === "horizontal") {
          this.board[x + i][y] = ship
        } else {
          this.board[x][y + i] = ship
        }
      }
    } else {
      throw new Error("Ship placement is out of bounds")
    }
  }

  isWithinBounds(x, y, length, orientation) {
    if (orientation === "horizontal") {
      return x >= 0 && x + length <= this.rows && y >= 0 && y < this.cols
    } else {
      return x >= 0 && x < this.rows && y >= 0 && y + length <= this.cols
    }
  }

  receiveAttack(coordinates) {
    const { x, y } = coordinates
    const ship = this.getShipAt({ x, y })

    if (ship) {
      ship.hit()
    } else {
      this.missedAttacks.push({ x, y })
    }
  }

  getShipAt(coordinates) {
    const { x, y } = coordinates
    return this.board[x][y]
  }

  getMissedAttacks() {
    return this.missedAttacks
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk())
  }
}

export default Gameboard
