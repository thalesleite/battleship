import Ship from "./ship"
jest.mock("./ship") // This mocks the entire Ship module

describe("Ship class tests", () => {
  it("Check if the class is called", () => {
    // Replace the constructor with a mock
    const mockShipConstructor = jest.fn()
    Ship.mockImplementation(mockShipConstructor)

    const ship = new Ship(4)
    expect(mockShipConstructor).toHaveBeenCalledTimes(1)
  })
})
