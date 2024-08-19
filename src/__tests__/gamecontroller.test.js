import GameController from "../gamecontroller.js"
import Player from "../player.js"

describe("GameController Class", () => {
  let gameController
  let player
  let computer

  beforeEach(() => {
    gameController = new GameController()
    player = gameController.player
    computer = gameController.computer
  })

  it("should start the game with player and computer", () => {
    expect(player).toBeInstanceOf(Player)
    expect(computer).toBeInstanceOf(Player)
    expect(player.opponentGameboard).toBe(computer.gameboard)
    expect(computer.opponentGameboard).toBe(player.gameboard)
  })

  // it("should end the game when all ships are sunk", () => {
  //   const spy = jest.spyOn(window, "alert").mockImplementation(() => {})
  //   player.gameboard.ships.forEach((ship) => {
  //     for (let i = 0; i < ship.length; i++) {
  //       player.gameboard.receiveAttack({ x: i, y: 0 })
  //     }
  //   })
  //   gameController.checkGameOver()
  //   expect(gameController.gameOver).toBe(true)
  //   expect(spy).toHaveBeenCalledWith(expect.stringContaining(computer.name))
  //   spy.mockRestore()
  // })
})
