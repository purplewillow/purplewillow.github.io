class Paint{
    constructor() {
      this.amount = 0
      this.paintPerClick = 1
      this.workerCost = 10
      this.workerAmount = 0
      this.timer = 0
      this.maxTimer = 5000
    }

    click() {
        this.amount += this.paintPerClick
    }

    increaseWorker() {
        if (this.amount >= this.workerCost) {
            this.workerAmount += 1
            this.amount -= this.workerCost
            this.workerCost *= 2
        }
    }

    increaseTimer(increaseAmount) {
        this.timer += increaseAmount
        if (this.timer >= this.maxTimer) {
            this.timer -= this.maxTimer
            this.amount += this.workerAmount
        }
    }

    showAmount() {
        return this.amount
    }

    showPaintPerClick() {
        return this.paintPerClick
    }
  }