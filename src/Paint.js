class Paint{
    constructor() {
      this.name = ''
      this.amount = 0
      this.timer = 0
      this.click = {strength: 0.10, upgrades: 0, upgradeCost: 5}
      this.speed = {maxTimer: 5000, upgrades: 0, upgradeCost: 5}
      this.bar = {reward: 1, upgrades: 0, upgradeCost: 5}
      this.automation = true
    }

    clickPaint() {
        var increaseAmount = this.click.strength * this.speed.maxTimer
        this.increaseTimer(increaseAmount)
     }

    increaseBar() {
        if (this.amount >= this.bar.upgradeCost) {
            this.bar.upgrades += 1
            this.bar.reward += 1
            this.amount -= this.bar.upgradeCost
            this.bar.upgradeCost *= 2
        }
    }

    increaseSpeed() {
        if (this.amount >= this.speed.upgradeCost) {
            this.speed.upgrades += 1
            this.speed.maxTimer *= 0.9
            this.amount -= this.speed.upgradeCost
            this.speed.upgradeCost *= 2
        }
    }

    increaseClick() {
        if (this.amount >= this.click.upgradeCost) {
            this.click.upgrades += 1
            this.click.strength += 0.1
            this.amount -= this.click.upgradeCost
            this.click.upgradeCost *= 2
        }
    }

    increaseTimer(increaseAmount) {
        this.timer += increaseAmount
        if (this.timer >= this.speed.maxTimer) {
            this.timer -= this.speed.maxTimer
            this.amount += this.bar.reward
        }
    }

  }