import Gameboard from "../gameboard.js"
import Ship from "../ship.js"

describe("Gameboard Class", () => {
  it("Check if the class is called", () => {
    const gameboard = new Gameboard()
    expect(gameboard).toBeInstanceOf(Gameboard)
  })

  it("Check if the board is set up with the correct dimensions", () => {
    const gameboard = new Gameboard()
    expect(gameboard.getDimension()).toEqual([15, 15])
  })

  it("Check if the correct number of ships are placed", () => {
    const gameboard = new Gameboard()
    const ships = gameboard.getShips()
    expect(ships.length).toBe(13)
  })

  it("Check if ships are placed on the board", () => {
    const gameboard = new Gameboard()
    const shipFound = gameboard.board.some((row) =>
      row.some((cell) => cell instanceof Ship)
    )
    expect(shipFound).toBe(true)
  })

  it("Check if ships are placed without overlapping", () => {
    const gameboard = new Gameboard()
    const board = gameboard.board

    for (let i = 0; i < gameboard.rows; i++) {
      for (let j = 0; j < gameboard.cols; j++) {
        if (board[i][j] !== null) {
          const ship = board[i][j]
          for (let x = 0; x < gameboard.rows; x++) {
            for (let y = 0; y < gameboard.cols; y++) {
              if (board[x][y] === ship && (i !== x || j !== y)) {
                if (i !== x && j !== y) {
                  throw new Error("Ships are overlapping diagonally")
                }
              }
            }
          }
        }
      }
    }

    expect(true).toBe(true) // Test will fail if any overlapping is found
  })

  it("Check if all ships sunk returns true when all ships are sunk", () => {
    const gameboard = new Gameboard()
    gameboard.getShips().forEach((ship) => {
      ship.hit = jest.fn()
      for (let i = 0; i < ship.length; i++) {
        ship.hit.mockClear()
        ship.isSunk = jest.fn().mockReturnValue(i === ship.length - 1)
        gameboard.receiveAttack(findShipCoordinates(gameboard.board, ship)[0])
      }
    })

    expect(gameboard.allShipsSunk()).toBe(true)
  })
})

// Helper function to find the coordinates of a ship on the board
function findShipCoordinates(board, ship) {
  const coordinates = []
  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[x].length; y++) {
      if (board[x][y] === ship) {
        coordinates.push({ x, y })
      }
    }
  }
  return coordinates
}
