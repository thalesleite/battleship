import Player from "./player.js"

class GameController {
  constructor() {
    this.player = new Player("Player")
    this.computer = new Player("Computer", true)
    this.currentPlayer = this.player
    this.gameOver = false

    this.player.setOpponentGameboard(this.computer.gameboard)
    this.computer.setOpponentGameboard(this.player.gameboard)
  }

  startGame() {
    this.renderBoards()
    this.addEventListeners()
  }

  switchTurns() {
    this.currentPlayer =
      this.currentPlayer === this.player ? this.computer : this.player
  }

  checkGameOver() {
    if (this.player.hasLost() || this.computer.hasLost()) {
      this.gameOver = true
      alert(`${this.currentPlayer.name} has won!`)
    }
  }

  handlePlayerMove(x, y) {
    if (!this.gameOver && this.currentPlayer === this.player) {
      if (this.currentPlayer.makeMove(x, y)) {
        this.renderBoards()
        this.checkGameOver()
        if (!this.gameOver) {
          this.switchTurns()
          this.computerMakeMove()
        }
      }
    }
  }

  computerMakeMove() {
    if (!this.gameOver && this.currentPlayer === this.computer) {
      this.currentPlayer.makeRandomMove()
      this.renderBoards()
      this.checkGameOver()
      if (!this.gameOver) {
        this.switchTurns()
      }
    }
  }

  renderBoards() {
    // Implement the rendering logic here
    this.renderBoard(this.player.gameboard, "player-board")
    this.renderBoard(this.computer.gameboard, "computer-board")
  }

  renderBoard(gameboard, elementId) {
    const boardElement = document.getElementById(elementId)
    boardElement.innerHTML = "" // Clear previous board
    for (let x = 0; x < gameboard.rows; x++) {
      for (let y = 0; y < gameboard.cols; y++) {
        const cell = document.createElement("div")
        cell.classList.add("cell")
        const ship = gameboard.getShipAt({ x, y })
        if (ship) {
          cell.classList.add("ship")
        }
        // Add event listener for player clicking on enemy board
        if (elementId === "computer-board") {
          cell.addEventListener("click", () => this.handlePlayerMove(x, y))
        }
        boardElement.appendChild(cell)
      }
    }
  }

  addEventListeners() {
    // Add event listeners here for starting the game, etc.
  }
}

export default GameController
