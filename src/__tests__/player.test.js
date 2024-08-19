import Player from "../player.js"
import Gameboard from "../gameboard.js"

describe("Player Class", () => {
  let player
  let computer
  let opponentGameboard

  beforeEach(() => {
    player = new Player("Player")
    computer = new Player("Computer", true)
    opponentGameboard = new Gameboard()
    player.setOpponentGameboard(opponentGameboard)
    computer.setOpponentGameboard(player.gameboard)
  })

  it("should create a player with a gameboard", () => {
    expect(player.name).toBe("Player")
    expect(player.isComputer).toBe(false)
    expect(player.gameboard).toBeInstanceOf(Gameboard)
  })

  it("should create a computer player", () => {
    expect(computer.name).toBe("Computer")
    expect(computer.isComputer).toBe(true)
    expect(computer.gameboard).toBeInstanceOf(Gameboard)
  })

  it("should set the opponent gameboard", () => {
    expect(player.opponentGameboard).toBe(opponentGameboard)
  })

  // it("should make a move on the opponent gameboard", () => {
  //   expect(player.makeMove(0, 0)).toBe(true)
  //   expect(opponentGameboard.board[0][0]).not.toBeNull()
  // })

  // it("should not allow the same move twice", () => {
  //   player.makeMove(0, 0)
  //   expect(player.makeMove(0, 0)).toBe(false)
  // })

  // it("should make a random move for the computer player", () => {
  //   const spy = jest.spyOn(Math, "random").mockReturnValue(0.5)
  //   computer.makeRandomMove()
  //   expect(player.gameboard.board[7][7]).not.toBeNull()
  //   spy.mockRestore()
  // })

  // it("should detect when a player has lost", () => {
  //   opponentGameboard.ships.forEach((ship) => {
  //     for (let i = 0; i < ship.length; i++) {
  //       opponentGameboard.receiveAttack({ x: i, y: 0 })
  //     }
  //   })
  //   expect(player.hasLost()).toBe(true)
  // })
})
