import Ship from "./ship"

describe("Ship class tests", () => {
  it("Check if the class is called", () => {
    const ship = new Ship(4)
    expect(ship).toBeInstanceOf(Ship)
  })

  it("Check if the class returns the correct length", () => {
    const ship = new Ship(4)
    expect(ship.getLength()).toBe(4)
  })

  it("Check if the class returns the correct numnber of hits", () => {
    const ship = new Ship(4)
    ship.hit()
    ship.hit()
    ship.hit()
    expect(ship.getHits()).toBe(3)

    ship.hit()
    ship.hit()
    expect(ship.getHits()).toBe(5)
  })

  it("Check if the class returns whether it is sunk", () => {
    const ship = new Ship(2)
    ship.hit()
    ship.hit()
    expect(ship.isSunk()).toBe(true)
  })
})
