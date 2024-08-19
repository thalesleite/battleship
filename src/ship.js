class Ship {
  constructor(length, shipClass = "") {
    this.length = length
    this.hits = 0
    this.shipClass = shipClass
  }

  getLength() {
    return this.length
  }

  getHits() {
    return this.hits
  }

  hit() {
    if (this.isSunk()) return null
    this.hits += 1
  }

  isSunk() {
    if (this.hits >= this.length) return true

    return false
  }
}

export default Ship
