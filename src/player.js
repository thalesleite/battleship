import Gameboard from "./gameboard.js"

class Player {
  constructor(name, isComputer = false) {
    this.name = name
    this.isComputer = isComputer
    this.gameboard = new Gameboard()
    this.opponentGameboard = null // This will be set when the game starts
    this.previousMoves = []
  }

  setOpponentGameboard(gameboard) {
    this.opponentGameboard = gameboard
  }

  makeMove(x, y) {
    if (this.isMoveLegal(x, y)) {
      this.previousMoves.push({ x, y })
      this.opponentGameboard.receiveAttack({ x, y })
      return true
    }
    return false
  }

  makeRandomMove() {
    let x, y
    do {
      x = Math.floor(Math.random() * this.opponentGameboard.rows)
      y = Math.floor(Math.random() * this.opponentGameboard.cols)
    } while (!this.isMoveLegal(x, y))

    this.makeMove(x, y)
  }

  isMoveLegal(x, y) {
    return !this.previousMoves.some((move) => move.x === x && move.y === y)
  }

  hasLost() {
    return this.gameboard.allShipsSunk()
  }
}

export default Player
