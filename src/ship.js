class Ship {
  constructor(length) {
    this.length = length
    this.hits = 0
  }

  getLength() {
    return this.length
  }

  getHits() {
    return this.hits
  }

  hit() {
    this.hits += 1
  }

  isSunk() {
    if (this.hits >= this.length) return true

    return false
  }
}

export default Ship
